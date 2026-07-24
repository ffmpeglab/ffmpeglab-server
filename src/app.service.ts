import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to FFmpegLAB Service, open api docs at /api';
  }
}
