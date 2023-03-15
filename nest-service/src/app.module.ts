import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoConfigMoudle } from './config/config.module';
import { CaseModule } from './case/case.module';

@Module({
  imports: [MongoConfigMoudle, CaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
