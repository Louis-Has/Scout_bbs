import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleType } from '../share-interface/dto';
import { Article } from 'src/schema/schema';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async queryDate(): Promise<ArticleType[]> {
    return await this.articleService.queryDate();
  }

  @Post()
  async create(@Body() params: ArticleType): Promise<Article> {
    return await this.articleService.create(params);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() params: ArticleType,
  ): Promise<Article> {
    return await this.articleService.update(id, params);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Article[]> {
    return await this.articleService.delete(id);
  }
}
