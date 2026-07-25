import type { APIKeyData } from '../types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LogPiece {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: number;

  @Column()
  logs: string;

  @Column({ type: 'uuid' })
  render: string;

  @Column({ type: 'uuid' })
  user_id: string;
}
