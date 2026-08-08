import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { PipelinesService } from './pipelines.service';
import { Pipeline } from '../model/pipeline.entity';

@UseGuards(AuthGuard)
@Controller('pipeline')
@ApiBearerAuth()
export class PipelinesController {
  constructor(private readonly pipelineService: PipelinesService) {}
  @Get('')
  @ApiResponse({ type: [Pipeline] })
  async findAll(@Request() req) {
    return await this.pipelineService.findAll(req.user);
  }

  @Get(':id')
  @ApiResponse({ type: Pipeline })
  @ApiParam({
    name: 'id',
    description: 'The ID of the pipeline',
    required: true,
    type: String,
  })
  async findOne(@Param() params: { id: string }, @Request() req) {
    return await this.pipelineService.findOne(params.id, req.user);
  }
}
