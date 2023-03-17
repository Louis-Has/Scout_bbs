import { SchemaFactory } from '@nestjs/mongoose';
import { ArticleType } from '../share-interface/dto';

export class Case {
  id: string;
  title: string;
  abstract: string;
  cover_url: string;
  jump_url: string;
  type: string;
  create_time: number;
  update_time: number;
  release_time: number;
}

export const CaseSchema = SchemaFactory.createForClass(Case);
CaseSchema.index({ title: 1 }, { unique: true });
CaseSchema.index({ id: 1 });


export class Article extends ArticleType {
  id: string;
  create_time: number;
  update_time: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
ArticleSchema.index({ id: 1 });
