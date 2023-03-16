import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        console.log(
          config.get('MONGO_INITDB_DATABASE'),
          config.get('MONGO_DATABASE'),
        );
        const mongooseOptions: MongooseModuleOptions = {
          // uri: `mongodb://${config.get('MONGO_HOSTNAME')}`,
          uri: `mongodb://mongoDB`,
          dbName: 'information',
          user: 'root',
          pass: '123123',
          authSource: 'admin',
        };
        return mongooseOptions;
      },
      inject: [ConfigService],
    }),
  ],
})
export class MongoConfigModel {}
