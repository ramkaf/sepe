/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AdminModule } from './app/admin.module';
import {
  ADMIN_RABBITMQ_QUEUE,
  RABBITMQ_URL,
} from '@sephrmicroservice-monorepo/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AdminModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URL],
        queue: ADMIN_RABBITMQ_QUEUE,
        queueOptions: { durable: false },
      },
    }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.listen().then(() => {
    logger.log('admin Microservice is listening');
  });
}
bootstrap();
