import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue, PgmqQueue } from 'nestjs-pgmq';
import { Repository } from 'typeorm';
import { Render } from '../model/render.entity';
import { MinimalMedia, RenderData } from '../types';
import { config } from '../config';
import { LogPiece } from '../model/logpiece.entity';

@Injectable()
export class RendersService {
  constructor(
    @InjectRepository(Render)
    private rendersRepository: Repository<Render>,
    @InjectRepository(LogPiece)
    private logRepository: Repository<LogPiece>,
    @InjectQueue(config.queue.name)
    private readonly queue: PgmqQueue,
  ) {}

  async findAll(userId: string): Promise<Render[]> {
    return (await this.rendersRepository.findBy({ user_id: userId })).map(
      (render) => {
        render.data = {} as any;
        return render;
      },
    );
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

  async updateMediaResult(renderId: string, media: MinimalMedia) {
    await this.rendersRepository.update({ id: renderId }, { result: media });
    return await this.findOne(renderId, media.userId as string);
  }

  async updateRenderStatus(
    renderId: string,
    status: 'done' | 'rendering' | 'error' | 'queue',
  ) {
    await this.rendersRepository.update({ id: renderId }, { status });
    return await this.rendersRepository.findOneBy({ id: renderId });
  }

  async appendLogs(renderId: string, logs: string, userId: string) {
    return await this.logRepository.insert({
      logs,
      render: renderId,
      user_id: userId,
      date: new Date().toISOString(),
    });
  }

  async enqueRender(renderId: string, userId: string) {
    const queueItem = await this.queue.add(
      'render',
      {
        renderId,
        userId,
      },
      { headers: { retryCount: 1 } },
    );
    await this.updateRenderStatus(renderId, "queue")
    return queueItem;
  }
}
