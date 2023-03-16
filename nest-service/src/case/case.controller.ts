import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseType, QueryCaseResDto } from '../share-interface/dto';
import { Case } from '../schema/schema';

@Controller('case')
export class CaseController {
  constructor(private readonly CaseService: CaseService) {}

  @Get(':queryId')
  async queryAll(@Param('queryId') queryId: string): Promise<QueryCaseResDto> {
    return await this.CaseService.queryBy(queryId);
  }

  @Post()
  async create(@Body() caseType: CaseType): Promise<Case> {
    return await this.CaseService.create(caseType);
  }
}
