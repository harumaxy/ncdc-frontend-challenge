import { ContentService } from './content.service';
import { Repository } from 'typeorm';
import { Content } from '../entities/content.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ContentService', () => {
  let contentRepo: Repository<Content>;
  let service: ContentService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ContentService,
        {
          provide: getRepositoryToken(Content),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<ContentService>(ContentService);
    contentRepo = moduleRef.get<Repository<Content>>(
      getRepositoryToken(Content),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find', async () => {
    const result: Content[] = [];
    jest.spyOn(contentRepo, 'find').mockResolvedValue(result);
    expect(await service.findAll()).toBe(result);
  });
});
