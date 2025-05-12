import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CustomRpcExceptionFilter, ErrorInterceptor } from '@sephrmicroservice-monorepo/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  // app.useGlobalFilters(new CustomRpcExceptionFilter())
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 HTTP api gateway is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
