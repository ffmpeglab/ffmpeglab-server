import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Render } from '../model/render.entity';
import { RenderData } from 'src/types';

@Injectable()
export class RendersService {
  constructor(
    @InjectRepository(Render)
    private rendersRepository: Repository<Render>,
  ) {}

  async findAll(): Promise<Render[]> {
    return this.rendersRepository.find();
  }

  async findOne(id: number): Promise<Render | null> {
    return this.rendersRepository.findOneBy({ id });
  }

  async writeRender(render: RenderData) {
    const n = await this.rendersRepository.insert({
      title: render.project.title,
      project: render.project.id,
      status: 'created',
      data: render,
      result: {},
    });
    return n;
  }
}
