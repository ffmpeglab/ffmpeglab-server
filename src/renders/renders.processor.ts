import { Processor, Process } from 'nestjs-pgmq';
import { config } from '../config';
import type { PgmqJob } from 'nestjs-pgmq';
import { RendersService } from './renders.service';
import { encodeProject } from '../ffmpeg/rendering';

@Processor(config.queue.name)
export class RenderProcessor {
  constructor(private readonly renderService: RendersService) {}
  @Process('render')
  async handleRender(job: PgmqJob<{ renderId: string; userId: string }>) {
    console.log('starting render ', job);
    const { renderId, userId } = job.message.data;
    const render = await this.renderService.findOne(renderId, userId);
    console.log('start encoding', render);
    const encoding = await encodeProject(
      render!.data.project,
      render!.data.layers,
      false,
      (p) => console.log(p),
      (l) => console.log(l),
    );
    console.log('encoding done', encoding);
  }
}
