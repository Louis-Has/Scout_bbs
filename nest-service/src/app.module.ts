import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoConfigModel } from './config/config.module';
import { CaseModule } from './case/case.module';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [MongoConfigModel, CaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
