/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AdminModule } from './app/admin.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AdminModule,
    {
      transport : Transport.KAFKA ,
      options : {
        client : {
          brokers : ['localhost:9092']
        },
        consumer : {
          groupId : 'order-consumer-group'
        }
      }
    }
  );
  await app.listen();
  Logger.log(
    `Admin Application is listening to kafka ...`
  );
}

bootstrap();
