import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiKey } from '../model/apikey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApiKey])],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
