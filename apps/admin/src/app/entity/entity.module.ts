import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityMicroserviceController } from './entity.controller';
import {
  ADMIN_RABBITMQ_QUEUE,
  ADMIN_RABBITMQ_SERVICE,
  EntityModel,
  RabbitMQModule,
} from '@sephrmicroservice-monorepo/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entity } from 'typeorm';

@Module({
  imports: [
    RabbitMQModule.register([
      { name: ADMIN_RABBITMQ_SERVICE, queue: ADMIN_RABBITMQ_QUEUE },
    ]),
    TypeOrmModule.forFeature([EntityModel]),
  ],
  controllers: [EntityMicroserviceController],
  providers: [EntityService],
})
export class EntityModule {}
