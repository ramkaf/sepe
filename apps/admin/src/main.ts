/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AdminModule } from './app/admin.module';
import { QUEUE_NAME, RABBITMQ_URL } from '@sephrmicroservice-monorepo/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AdminModule,  {
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: QUEUE_NAME,
      queueOptions: { durable: false }
    }
  }
);
  
  app.listen().then(() => {
    logger.log('Microservice is listening');
  });
}
bootstrap();
