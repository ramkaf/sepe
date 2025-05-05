import { Module } from '@nestjs/common';
import { EntityFieldService } from './entity-field.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityField } from 'common/src/lib/database/postgresql';
import {
  ADMIN_RABBITMQ_QUEUE,
  ADMIN_RABBITMQ_SERVICE,
  RabbitMQModule,
} from '@sephrmicroservice-monorepo/common';
import { browserGroupEntity } from 'common/src/lib/database/postgresql/entities/browser-group.entity';
import { EntityFieldMicroserviceController } from './entity-field.controller';

@Module({
  imports: [
    RabbitMQModule.register([
      { name: ADMIN_RABBITMQ_SERVICE, queue: ADMIN_RABBITMQ_QUEUE },
    ]),
    TypeOrmModule.forFeature([EntityField , browserGroupEntity])
  ],
  controllers: [EntityFieldMicroserviceController],
  providers: [EntityFieldService],
  exports: [EntityFieldService],
})
export class EntityFieldModule {}
