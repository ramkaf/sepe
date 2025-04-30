import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EntityController } from './controllers/admin/entity.controller';
import { EntityFieldController } from './controllers/admin/entity-field.controller';
import { EntityTypeController } from './controllers/admin/entity-type.controller';
import { QUEUE_NAME, RABBITMQ_SERVICE, RABBITMQ_URL } from '@sephrmicroservice-monorepo/common';
import { AppController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBITMQ_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QUEUE_NAME,
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [EntityFieldController , EntityTypeController , EntityController , AppController],
  providers: [],
})
export class AppModule {}
