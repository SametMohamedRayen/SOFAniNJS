import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/items', json({ limit: '50mb' }));
  app.use(json({ limit: '100kb' }));
  await app.listen(3000);
}
bootstrap();
