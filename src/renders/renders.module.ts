import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RendersService } from './renders.service';
import { RendersController } from './renders.controller';
import { Render } from '../model/render.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Render])],
  providers: [RendersService],
  controllers: [RendersController],
})
export class RendersModule {}
