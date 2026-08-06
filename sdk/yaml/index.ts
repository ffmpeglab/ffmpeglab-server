// src/transpiler/index.ts
import * as fs from 'fs';
import * as yaml from 'js-yaml';

import { PipelineConfig } from './types';

class YAMLToSQLTranspiler {
  private config: PipelineConfig;

  constructor(yamlContent: string) {
    this.config = yaml.load(yamlContent) as PipelineConfig;
  }

  transpile(): string {
    const parts: string[] = [];

    parts.push(this.generateHeader());
    parts.push(this.generateBuckets());
    parts.push(this.generateRLSPolicies());
    parts.push(this.generateQueue());
    parts.push(this.generateTriggerFunction());
    parts.push(this.generateTrigger());
    parts.push(this.generateViews());
    parts.push(this.generateNotifications());

    return parts.join('\n\n');
  }

  private generateHeader(): string {
    return `
-- ============================================================
-- ${this.config.name}
-- ${this.config.description}
-- Version: ${this.config.version}
-- Generated: ${new Date().toISOString()}
-- ============================================================
-- This script adds the ${this.config.name.toLowerCase()} pipeline components.
-- It assumes the render and logpiece tables already exist.
-- ============================================================
`;
  }

  private generateBuckets(): string {
    const buckets = this.config.storage.buckets
      .map((bucket) => {
        const mimeTypes = bucket.allowed_mime_types
          .map((t) => `'${t}'`)
          .join(', ');
        return `
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
  '${bucket.name}',
  '${bucket.name}',
  ${bucket.public},
  false,
  5368709120,
  ARRAY[${mimeTypes}]
) ON CONFLICT (id) DO NOTHING;`;
      })
      .join('\n');

    return `
-- ============================================================
-- 1. Create storage buckets
-- ============================================================
${buckets}`;
  }

  private generateRLSPolicies(): string {
    const policies = this.config.storage.rls_policies
      .map(
        (policy) => `
DROP POLICY IF EXISTS "${policy.name}" ON storage.objects;
CREATE POLICY "${policy.name}"
ON storage.objects
FOR ${policy.operation}
TO ${policy.role}
${policy.operation === 'INSERT' ? 'WITH CHECK' : 'USING'} (
  ${policy.condition}
);`,
      )
      .join('\n');

    return `
-- ============================================================
-- 2. RLS policies for buckets
-- ============================================================
${policies}`;
  }

  private generateQueue(): string {
    return `
-- ============================================================
-- 3. Enable pgmq extension and create the queue
-- ============================================================
CREATE EXTENSION IF NOT EXISTS pgmq;

SELECT pgmq.create('${this.config.queue.name}');`;
  }

  private generateTriggerFunction(): string {
    const steps = this.config.pipeline.steps;

    // Build the commands JSON for each step
    const commandsJson = steps
      .map(
        (step) => `
          -- ${step.description}
          commands := commands || jsonb_build_object(
              'type', '${step.id}',
              'output_path', '${step.output_path}',
              'command', '${step.command.replace(/"/g, '\\"')}'
          );`,
      )
      .join('\n');

    // Build the depends_on logic
    const dependencyChecks = steps
      .filter((step) => step.depends_on && step.depends_on.length > 0)
      .map((step) => {
        const deps = step
          .depends_on!.map((d) => `(commands->>'type')::text = '${d}'`)
          .join(' OR ');
        return `IF ${deps} THEN`;
      })
      .join('\n');

    return `
-- ============================================================
-- 4. Create the trigger function
-- ============================================================
DROP FUNCTION IF EXISTS ${this.config.trigger.name}() CASCADE;

CREATE OR REPLACE FUNCTION ${this.config.trigger.name}()
RETURNS TRIGGER AS $$
DECLARE
    user_id text;
    file_path text;
    file_name text;
    file_extension text;
    mime_type text;
    base_filename text;
    msg jsonb;
    commands jsonb := '[]';
    video_mime_types text[] := ARRAY['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/mpeg'];
    audio_mime_types text[] := ARRAY['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/flac', 'audio/aac', 'audio/mp4'];
BEGIN
    IF ${this.config.trigger.condition} THEN
        user_id := (storage.foldername(NEW.name))[1];
        file_path := NEW.name;
        file_name := (storage.filename(NEW.name));
        file_extension := split_part(file_name, '.', array_length(string_to_array(file_name, '.'), 1));
        mime_type := NEW.metadata->>'mimetype';
        base_filename := replace(file_name, '.' || file_extension, '');

${commandsJson}

        msg := jsonb_build_object(
            'userId', user_id,
            'inputPath', file_path,
            'inputBucket', NEW.bucket_id,
            'outputBucket', 'public-processed',
            'fileName', file_name,
            'baseFilename', base_filename,
            'mimeType', mime_type,
            'commands', commands,
            'timestamp', NOW()
        );

        PERFORM pgmq.send('${this.config.queue.name}', msg::jsonb);

        INSERT INTO "render" (id, title, project, status, public, user_id, data)
        VALUES (
            gen_random_uuid(),
            file_name,
            '${this.config.render.project_name}',
            '${this.config.render.status}',
            ${this.config.render.public},
            user_id::uuid,
            msg
        );

        PERFORM pg_notify(
            '${this.config.notifications.channels[0].name}',
            ${this.config.notifications.channels[0].payload}::text
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;`;
  }

  private generateTrigger(): string {
    return `
-- ============================================================
-- 5. Attach the trigger to storage.objects
-- ============================================================
DROP TRIGGER IF EXISTS ${this.config.trigger.name}_trigger ON ${this.config.trigger.table};

CREATE TRIGGER ${this.config.trigger.name}_trigger
AFTER ${this.config.trigger.event} ON ${this.config.trigger.table}
FOR EACH ROW
EXECUTE FUNCTION ${this.config.trigger.name}();`;
  }

  private generateViews(): string {
    const queueName = this.config.queue.name;
    return `
-- ============================================================
-- 6. Helper views for monitoring
-- ============================================================
DROP VIEW IF EXISTS ${queueName}_view;

CREATE OR REPLACE VIEW ${queueName}_view AS
SELECT
    msg_id,
    read_ct,
    enqueued_at,
    vt,
    message::jsonb as payload,
    (message::jsonb->>'userId') as user_id,
    (message::jsonb->>'fileName') as file_name
FROM pgmq.q_${queueName}
ORDER BY msg_id DESC;`;
  }

  private generateNotifications(): string {
    const channels = this.config.notifications.channels
      .map(
        (channel) => `PERFORM pg_notify('${channel.name}', '{"init": true}');`,
      )
      .join('\n    ');

    return `
-- ============================================================
-- 7. Initialize notification channels
-- ============================================================
DO $$
BEGIN
    ${channels}
END $$;`;
  }

  // Generate the complete SQL migration file
  generateMigrationFile(): string {
    return `
-- ============================================================
-- ${this.config.name}
-- ${this.config.description}
-- ============================================================

${this.generateHeader()}

${this.generateBuckets()}

${this.generateRLSPolicies()}

${this.generateQueue()}

${this.generateTriggerFunction()}

${this.generateTrigger()}

${this.generateViews()}

${this.generateNotifications()}

-- ============================================================
-- All done!
-- ============================================================`;
  }
}

// Usage
function transpilePipeline(yamlFile: string, outputFile: string) {
  const yamlContent = fs.readFileSync(yamlFile, 'utf8');
  const transpiler = new YAMLToSQLTranspiler(yamlContent);
  const sql = transpiler.generateMigrationFile();
  fs.writeFileSync(outputFile, sql);
  console.log(`✅ SQL migration generated: ${outputFile}`);
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node transpile.js <input.yaml> <output.sql>');
    process.exit(1);
  }
  transpilePipeline(args[0], args[1]);
}

export { YAMLToSQLTranspiler, transpilePipeline };
