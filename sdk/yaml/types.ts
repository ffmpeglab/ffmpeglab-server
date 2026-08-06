export interface PipelineConfig {
  name: string;
  description: string;
  version: string;
  storage: {
    buckets: Array<{
      name: string;
      public: boolean;
      allowed_mime_types: string[];
    }>;
    rls_policies: Array<{
      name: string;
      operation: string;
      role: string;
      condition: string;
    }>;
  };
  queue: {
    name: string;
  };
  trigger: {
    name: string;
    event: string;
    table: string;
    condition: string;
  };
  pipeline: {
    steps: Array<{
      id: string;
      type: string;
      description: string;
      command: string;
      inputs: string[];
      outputs: string[];
      output_path: string;
      depends_on?: string[];
    }>;
  };
  notifications: {
    channels: Array<{
      name: string;
      payload: string;
    }>;
  };
  render: {
    project_name: string;
    status: string;
    public: boolean;
  };
}
