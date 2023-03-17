import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        console.log(
          'ready to connect to db',
        );
        const mongooseOptions: MongooseModuleOptions = {
          // uri: `mongodb://${config.get('MONGO_HOSTNAME')}`,
          uri: `mongodb://mongo`,
          dbName: config.get('MONGO_DATABASE'),
          user: config.get('MONGO_USERNAME'),
          pass: config.get('MONGO_PASSWORD'),
          authSource: 'admin',
        };
        return mongooseOptions;
      },
      inject: [ConfigService],
    }),
  ],
})
export class MongoConfigModel {}
