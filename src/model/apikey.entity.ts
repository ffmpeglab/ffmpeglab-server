import type { APIKeyData } from '../types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ApiKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  apikey: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column('simple-json')
  data: APIKeyData;
}
