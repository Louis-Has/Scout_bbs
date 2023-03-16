import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';
import { Case, CaseSchema } from '../schema/schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'case', schema: CaseSchema, collection: 'case' },
    ]),
  ],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
