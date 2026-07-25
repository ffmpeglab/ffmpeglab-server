import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RendersService } from './renders.service';
import { RendersController } from './renders.controller';
import { Render } from '../model/render.entity';
import { config } from '../config';
import { RenderProcessor } from './renders.processor';
import { AuthService } from '../auth/auth.service';
import { ApiKey } from '../model/apikey.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Render]),
    TypeOrmModule.forFeature([ApiKey]),
  ],
  providers: [
    AuthService,
    RendersService,
    ...(config.queue.isRunner ? [RenderProcessor] : []),
  ],
  controllers: [RendersController],
})
export class RendersModule {}
