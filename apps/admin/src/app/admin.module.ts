import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EntityTypeModule } from './entity-type/entity-type.module';
import { EntityFieldModule } from './entity-fields/entity-field.module';
import {
  ADMIN_RABBITMQ_QUEUE,
  ADMIN_RABBITMQ_SERVICE,
  // AllExceptionsFilter,
  ChartDetail,
  ChartEntity,
  ElasticModule,
  EntityModel,
  PostgresModule,
  RabbitMQModule,
} from '@sephrmicroservice-monorepo/common';
import { ChartModule } from './chart/chart.module';
import { DetailFieldModule } from './detail-field/detail-field.module';
import { EntityModule } from './entity/entity.module';
import { ChartDetailModule } from './chart-detail/chart-detail.module';
import { InitPlantModule } from './init-plant/init-plant.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AddMicroserviceController } from './init-plant/controllers/add.controller';

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
    InitPlantModule,
    // ElasticModule
    // ChartDetail,
    // DetailFieldModule,
  ],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: AllExceptionsFilter,
  //   }
  // ],
})
export class AdminModule {}
