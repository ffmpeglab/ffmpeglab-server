import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue, PgmqQueue } from 'nestjs-pgmq';
import { Repository } from 'typeorm';
import { Render } from '../model/render.entity';
import { RenderData } from '../types';
import { config } from '../config';

@Injectable()
export class RendersService {
  constructor(
    @InjectRepository(Render)
    private rendersRepository: Repository<Render>,
    @InjectQueue(config.queue.name)
    private readonly queue: PgmqQueue,
  ) {}

  async findAll(userId: string): Promise<Render[]> {
    return this.rendersRepository.findBy({ user_id: userId });
  }

  async findOne(id: string, userId: string): Promise<Render | null> {
    return this.rendersRepository.findOneBy({ id, user_id: userId });
  }

  async writeRender(render: RenderData, userId: string) {
    const n = await this.rendersRepository.insert({
      title: render.project.title,
      project: render.project.id,
      status: 'created',
      data: render,
      public: false,
      user_id: userId,
      progress: 0,
      logs: '',
      result: {},
    });
    return await this.findOne(n.identifiers[0].id, userId);
  }

  async enqueRender(renderId: string, userId: string) {
    const queueItem = await this.queue.add('render', {
      renderId,
      userId,
    });
    return queueItem;
  }
}
