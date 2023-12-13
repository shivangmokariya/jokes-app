import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';

function globalMiddelwareOne(req: Request, res: Response, next: NextFunction) {
  // console.log('this is Global middelware.');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalMiddelwareOne);
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
