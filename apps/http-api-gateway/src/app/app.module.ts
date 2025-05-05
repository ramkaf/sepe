import { Module } from '@nestjs/common';
import { EntityFieldController } from './controllers/admin/entities/entity-field.controller';
import { EntityTypeController } from './controllers/admin/entities/entity-type.controller';
import {
  ADMIN_RABBITMQ_QUEUE,
  ADMIN_RABBITMQ_SERVICE,
  RabbitMQModule,
} from '@sephrmicroservice-monorepo/common';

@Module({
  imports: [
    RabbitMQModule.register([
      { name: ADMIN_RABBITMQ_SERVICE, queue: ADMIN_RABBITMQ_QUEUE },
    ]),
  ],
  controllers: [EntityTypeController , EntityFieldController],
})
export class AppModule {}
