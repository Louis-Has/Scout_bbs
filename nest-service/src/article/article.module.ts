import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../schema/schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'article', schema: ArticleSchema, collection: 'article' },
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
