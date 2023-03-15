import { SchemaFactory } from '@nestjs/mongoose';

export class Case {
  // id
  id: string;
  // 标题
  title: string;
  // 摘要
  abstract: string;
  // 封面链接
  cover_url: string;
  // 跳转链接
  jump_url: string;
  // 资讯类型
  type: string;
  // 创建时间
  create_time: number;
  // 更新时间
  update_time: number;
  // 更新时间
  release_time: number;
}

export const CaseSchema = SchemaFactory.createForClass(Case);

CaseSchema.index({ title: 1 }, { unique: true });
CaseSchema.index({ id: 1 });
