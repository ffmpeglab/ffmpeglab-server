import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { RendersService } from './renders.service';
import { Render } from 'src/model/render.entity';
import { RenderDto } from './renders.dto';
@Controller('renders')
export class RendersController {
  constructor(private readonly renderService: RendersService) {}

  @Get('')
  async findAll(): Promise<Render[]> {
    return await this.renderService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: { id: number }): Promise<Render | null> {
    return await this.renderService.findOne(params.id);
  }

  @Post()
  async create(@Body() createRender: RenderDto) {
    return await this.renderService.writeRender(createRender);
  }
}
