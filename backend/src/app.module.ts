import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentModule } from './content/content.module';
import dataSource from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(dataSource.options), ContentModule],
})
export class AppModule {}
