import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/transform-interceptor.service';

const PORT = parseInt(process.env.SERVER_PORT, 10) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(PORT);
  console.log('now listening ', PORT);
}
bootstrap();
