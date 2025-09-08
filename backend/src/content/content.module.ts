import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { Content } from '../entities/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ContentController],
  imports: [TypeOrmModule.forFeature([Content])],
  providers: [ContentService],
})
export class ContentModule {}
