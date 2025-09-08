import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Put,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDTO, UpdateContentDTO } from './content.dto';
import { Content } from '../entities/content.entity';

@ApiTags('Content')
@ApiExtraModels(Content)
@Controller('content')
export class ContentController {
  constructor(private readonly service: ContentService) {}

  @Get()
  @ApiOperation({ summary: 'コンテンツ一覧の取得' })
  @ApiResponse({
    status: 200,
    description: 'コンテンツ一覧を取得します',
    type: [Content],
  })
  async getAllContentList(): Promise<Content[]> {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'コンテンツの取得' })
  @ApiResponse({
    status: 200,
    description: '指定されたIDのコンテンツを取得します',
    type: Content,
  })
  async getContent(@Param('id') id: number): Promise<Content> {
    const res = await this.service.findOne(id);
    if (res === undefined) throw new BadRequestException();
    return res;
  }

  @Post()
  @ApiOperation({ summary: 'コンテンツの作成' })
  @ApiBody({ type: CreateContentDTO })
  @ApiResponse({
    status: 201,
    description: '新しいコンテンツが作成されました',
    type: Content,
  })
  async addContent(@Body() content: CreateContentDTO) {
    return await this.service.create(content);
  }

  @Put(':id')
  @ApiOperation({ summary: 'コンテンツの更新' })
  @ApiBody({ type: UpdateContentDTO })
  @ApiResponse({
    status: 200,
    description: 'コンテンツが更新されました',
    type: Content,
  })
  async updateContent(
    @Param('id') id: number,
    @Body() content: UpdateContentDTO,
  ) {
    const res = await this.service.update(id, content);
    if (res === undefined) throw new BadRequestException();
    return res;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'コンテンツの削除' })
  @ApiResponse({
    status: 204,
    description: 'コンテンツが削除されました',
  })
  async deleteContent(@Param('id') id: number) {
    const res = await this.service.delete(id);
    if (res == null) throw new BadRequestException();
    return res;
  }
}
