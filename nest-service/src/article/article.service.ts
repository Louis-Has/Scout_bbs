import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, Case } from '../schema/schema';
import { ArticleType } from '../share-interface/dto';
import { currentTime, getUUID } from '../utils';
import { snakeCase } from 'lodash';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('article')
    private readonly articleModel: Model<Article & Document>,
  ) {}

  // create article
  async create(params: ArticleType): Promise<Article> {
    const tmpData: Article = {
      id: getUUID(),
      create_time: currentTime(),
      update_time: currentTime(),
      cover: params.cover,
      title: params.title,
      sub_title: params.sub_title,
      pathname: params.pathname,
    };

    try {
      const insetProcess = await this.articleModel.collection.insertOne(
        tmpData,
      );
    } catch (e) {
      throw new HttpException('create article failed', 251);
    }

    return await this.articleModel.collection.findOne<Article>({
      id: tmpData.id,
    });
  }

  // query article date
  async queryDate(): Promise<Article[]> {
    return await this.articleModel.collection.find<Article>({}).toArray();
  }

  // update article by id
  async update(id: string, updateDate: ArticleType): Promise<Article> {
    let updates: { [key: string]: any } = {};

    for (const key of Object.keys(updateDate)) {
      if (updateDate[key]) {
        updates[snakeCase(key)] = updateDate[key];
      }
    }
    updates['update_time'] = currentTime();

    try {
      const albumUpdateRes = await this.articleModel.collection.updateOne(
        { id },
        updates,
      );
    } catch (e) {
      throw new HttpException('update article failed', 251);
    }

    return await this.articleModel.collection.findOne<Article>({ id });
  }

  // delete case by id
  async delete(id: string): Promise<Article[]> {
    const deleteRes = await this.articleModel.collection.deleteOne({ id });
    if (!Boolean(deleteRes.acknowledged)) console.log(`delete article failed`);
    return await this.articleModel.collection.find<Article>({}).toArray();
  }
}
