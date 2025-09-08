import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from '../entities/content.entity';
import { CreateContentDTO, UpdateContentDTO } from './content.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  create = async (content: CreateContentDTO) => {
    const { body, title } = content;
    const createContent = this.contentRepository.create({
      title: title,
      body: body,
    });
    const childContent = await this.contentRepository.save(createContent);
    return childContent;
  };

  update = async (id: number, contentDto: UpdateContentDTO) => {
    const content = await this.contentRepository.findOneBy({ id });
    if (content === undefined) return undefined;
    await this.contentRepository.update({ id }, { ...contentDto });
    return await this.contentRepository.findOneBy({ id });
  };
  delete = async (id: number) => {
    const deleteContent = await this.contentRepository.findOneBy({ id });
    if (deleteContent === undefined) return undefined;
    return await this.contentRepository.remove(deleteContent);
  };

  findAll = async () => {
    return await this.contentRepository.find();
  };

  findOne = async (id: number) => {
    return await this.contentRepository.findOneBy({ id });
  };
}
