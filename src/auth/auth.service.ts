import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKey } from 'src/model/apikey.entity';
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
