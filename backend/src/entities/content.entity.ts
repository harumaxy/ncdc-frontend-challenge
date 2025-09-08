import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Content {
  @ApiProperty({
    description: 'コンテンツのID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ApiProperty({
    description: 'コンテンツのタイトル',
    example: 'Hello Title',
    nullable: true,
  })
  @Column('varchar', { length: 100, nullable: true })
  title?: string;

  @ApiProperty({
    description: 'コンテンツの本文',
    example: 'Hello Body',
    nullable: true,
  })
  @Column('varchar', { length: 2000, nullable: true })
  body?: string;

  @ApiProperty({
    description: '作成日時',
    example: '2025-04-04T00:00:00.000Z',
  })
  @CreateDateColumn()
  readonly createdAt?: Date;

  @ApiProperty({
    description: '更新日時',
    example: '2025-04-04T00:00:00.000Z',
  })
  @UpdateDateColumn()
  readonly updatedAt?: Date;
}
