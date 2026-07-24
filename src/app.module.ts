import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { RendersModule } from './renders/renders.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...config.db,
    }),
    RendersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
