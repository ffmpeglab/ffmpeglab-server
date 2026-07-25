import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKey } from '../model/apikey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ApiKey)
    private apikeyRepository: Repository<ApiKey>,
  ) {}
  async findKey(token: string) {
    return await this.apikeyRepository.findOneBy({ apikey: token });
  }
}
