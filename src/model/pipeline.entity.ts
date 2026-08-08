import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pipeline {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  status: string;

  @Column({ type: 'uuid' })
  @ApiProperty()
  user_id: string;

  @Column()
  @ApiProperty()
  downsql: string;

  @Column()
  @ApiProperty()
  upsql: string;

  @Column()
  @ApiProperty()
  yml: string;
}
