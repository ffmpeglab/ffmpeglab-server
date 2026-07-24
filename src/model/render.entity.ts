import type { Media, RenderData } from 'src/types';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Render {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  project: string;

  @Column()
  status: string;

  @Column('simple-json')
  data: RenderData;

  @Column('simple-json')
  result: Media;
}
