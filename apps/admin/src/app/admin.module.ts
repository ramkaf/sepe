import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EntityTypeModule } from './entity-type/entity-type.module';
import { EntityFieldModule } from './entity-fields/entity-field.module';
import {
  ADMIN_RABBITMQ_QUEUE,
  ADMIN_RABBITMQ_SERVICE,
  ChartDetail,
  ChartEntity,
  EntityModel,
  PostgresModule,
  RabbitMQModule,
} from '@sephrmicroservice-monorepo/common';
import { ChartModule } from './chart/chart.module';
import { DetailFieldModule } from './detail-field/detail-field.module';
import { EntityModule } from './entity/entity.module';
import { ChartDetailModule } from './chart-detail/chart-detail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RabbitMQModule.register([
      { name: ADMIN_RABBITMQ_SERVICE, queue: ADMIN_RABBITMQ_QUEUE },
    ]),
    PostgresModule,
    EntityTypeModule,
    EntityFieldModule,
    EntityModule,
    ChartModule,
    ChartDetailModule,
    DetailFieldModule,

    // ChartDetail,
    // DetailFieldModule,
  ]
})
export class AdminModule {}
