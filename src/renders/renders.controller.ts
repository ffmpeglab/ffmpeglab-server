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

import { RendersService } from './renders.service';
import { RenderDto, RunDto } from './renders.dto';
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { RenderResponse } from 'src/types';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('renders')
@ApiBearerAuth()
export class RendersController {
  constructor(private readonly renderService: RendersService) {}

  @Get('')
  @ApiResponse({ type: [RenderResponse] })
  async findAll(@Request() req) {
    return await this.renderService.findAll(req.user);
  }

  @Get(':id')
  @ApiResponse({ type: RenderResponse })
  async findOne(@Param() params: { id: string }, @Request() req) {
    return await this.renderService.findOne(params.id, req.user);
  }

  @Post()
  @ApiResponse({ type: RenderResponse })
  async create(@Body() createRender: RenderDto, @Request() req) {
    return await this.renderService.writeRender(createRender, req.user);
  }

  @Put('run')
  async runRender(@Body() runRender: RunDto, @Request() req) {
    return await this.renderService.enqueRender(runRender.id, req.user);
  }
}
