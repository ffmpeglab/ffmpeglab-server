import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pipeline } from '../model/pipeline.entity';

@Injectable()
export class PipelinesService {
  constructor(
    @InjectRepository(Pipeline)
    private pipelinesRepository: Repository<Pipeline>,
  ) {}
  async findAll(userId: string): Promise<Pipeline[]> {
    return await this.pipelinesRepository.findBy({ user_id: userId });
  }

  async findOne(id: string, userId: string): Promise<Pipeline | null> {
    return await this.pipelinesRepository.findOneBy({ id, user_id: userId });
  }
}
