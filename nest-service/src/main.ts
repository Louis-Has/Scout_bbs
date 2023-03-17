import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/transform.service';
import { LoggingInterceptor } from './common/logging.interceptor';

const PORT = parseInt(process.env.SERVER_PORT, 10) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(PORT);
  console.log('now listening ', PORT);
}
bootstrap();
