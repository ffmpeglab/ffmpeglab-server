import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { withSupabase } from '@supabase/server/adapters/nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('FFmpeglab')
    .setDescription('FFmpeglab API')
    .setVersion('1.0')
    .addTag('ffmpeglab')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  app.useGlobalGuards(new (withSupabase({ auth: 'user' }))());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
