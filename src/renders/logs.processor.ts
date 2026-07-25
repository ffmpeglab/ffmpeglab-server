import { Processor, Process } from 'nestjs-pgmq';
import { config } from '../config';
import type { PgmqJob } from 'nestjs-pgmq';
import { RendersService } from './renders.service';

@Processor(config.queue.logs)
export class LogsProcessor {
  @Process('logs')
  async handleLogs(
    job: PgmqJob<{ renderId: string; logs: string; progress: number }>,
  ) {
    console.log('new logs ', job);
  }
}
