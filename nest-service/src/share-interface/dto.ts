import { Expose } from 'class-transformer';
import { IsNotEmpty, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Case } from '../schema/schema';

export class CaseType {
  title: string;
  abstract: string;
  @Expose({ name: 'cover_url' })
  coverUrl: string;
  @Expose({ name: 'jump_url' })
  jumpUrl: string;
  type: string;
  @Expose({ name: 'release_time' })
  releaseTime: number;
}

export class QueryCaseDto {
  @IsNotEmpty({ message: '资讯类型未传' })
  type: string;
  current: number;
  pageSize: number;
}

export class QueryCaseResDto {
  data: Case[];
  total: number;
  current: number;
}

export class ArticleType {
  cover: string;
  title: string;
  sub_title: string;
  pathname: string;
}
