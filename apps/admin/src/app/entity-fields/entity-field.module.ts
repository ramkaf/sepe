import { Module } from '@nestjs/common';
import { EntityFieldService } from './entity-field.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityField } from 'common/src/lib/database/postgresql';
import { EntityMicroserviceController } from '../entity/entity.controller';
import { ADMIN_RABBITMQ_QUEUE, ADMIN_RABBITMQ_SERVICE, RabbitMQModule } from '@sephrmicroservice-monorepo/common';

@Module({
  imports: [
    RabbitMQModule.register([
      {name : ADMIN_RABBITMQ_SERVICE, queue : ADMIN_RABBITMQ_QUEUE}
    ])
  ],
  controllers: [EntityMicroserviceController],
  providers: [EntityFieldService],
  exports: [EntityFieldService],
})
export class EntityFieldModule {}
