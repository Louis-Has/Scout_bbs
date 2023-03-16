import { HttpException, Injectable } from '@nestjs/common';
import { CaseType, QueryCaseResDto } from '../share-interface/dto';
import { Case } from '../schema/schema';
import { Document, Model } from 'mongoose';
import { currentTime, getUUID } from 'src/utils';
import { snakeCase } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CaseService {
  constructor(
    @InjectModel('case')
    private readonly caseModel: Model<Case & Document>,
  ) {}

  // create case
  async create(caseType: CaseType): Promise<Case> {
    const caseInsertInfo: Case = {
      id: getUUID(),
      title: caseType.title,
      abstract: caseType.abstract,
      cover_url: caseType.coverUrl,
      jump_url: caseType.jumpUrl,
      type: caseType.type,
      create_time: currentTime(),
      update_time: currentTime(),
      release_time: caseType.releaseTime,
    };

    try {
      const CaseInsertRet = await this.caseModel.collection.insertOne(
        caseInsertInfo,
      );
    } catch (e) {
      throw new HttpException('新增资讯失败', 251);
    }

    return await this.caseModel.collection.findOne<Case>({
      id: caseInsertInfo.id,
    });
  }

  // query case by id
  async queryBy(queryId): Promise<QueryCaseResDto> {
    const data = await this.caseModel.collection
      .find<Case>({ id: queryId })
      .toArray();
    return {
      data,
      total: 100,
      current: 10,
    };
  }

  // update case by id
  async update(id: string, updateCaseDto: Case): Promise<Case> {
    let updates: { [key: string]: any } = {};

    for (const key of Object.keys(updateCaseDto)) {
      if (updateCaseDto[key]) {
        updates[snakeCase(key)] = updateCaseDto[key];
      }
    }
    updates['update_time'] = currentTime();

    const albumUpdateRes = await this.caseModel.collection.updateOne(
      { id },
      updates,
    );
    if (!Boolean(albumUpdateRes.acknowledged))
      console.log(`update case failed`);

    return await this.caseModel.collection.findOne<Case>({ id });
  }

  // delete case by id
  async delete(id: string): Promise<boolean> {
    const deleteRes = await this.caseModel.collection.deleteOne({ id });
    if (!Boolean(deleteRes.acknowledged)) console.log(`删除资讯失败`);
    return true;
  }
}
