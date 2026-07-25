import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgmqModule } from 'nestjs-pgmq';
import { config } from './config';
import { RendersModule } from './renders/renders.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RenderProcessor } from './renders/renders.processor';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...config.db,
    }),
    PgmqModule.forRootAsync({
      useFactory: () => ({
        connection: config.db,
      }),
    }),
    // 2. Register a queue
    PgmqModule.registerQueue({
      name: config.queue.name,
    }),
    PgmqModule.registerQueue({
      name: config.queue.logs,
    }),
    PgmqModule.registerQueue({
      name: config.queue.file,
    }),
    RendersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
