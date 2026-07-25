import type { Media, RenderData } from '../types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Render {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  project: string;

  @Column()
  status: string;

  @Column()
  public: boolean;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column()
  progress: number;

  @Column()
  logs: string;

  @Column('simple-json')
  data: RenderData;

  @Column('simple-json')
  result: Media;
}
