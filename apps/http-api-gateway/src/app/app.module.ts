import { Module } from '@nestjs/common';
import { EntityFieldController } from './controllers/admin/entities/entity-field.controller';
import { EntityTypeController } from './controllers/admin/entities/entity-type.controller';
import {
  ADMIN_RABBITMQ_QUEUE,
  ADMIN_RABBITMQ_SERVICE,
  // AllExceptionsFilter,
  RabbitMQModule,
} from '@sephrmicroservice-monorepo/common';
import { EntityController } from './controllers/admin/entities/entity.controller';
import { ChartController } from './controllers/admin/charts/chart.controller';
import { ChartDetailsController } from './controllers/admin/charts/chart-detail.controller';
import { DetailFieldController } from './controllers/admin/charts/detail-field.controller';
import { PlantInitController } from './controllers/admin/plantinit/init-plant.controller';
import { SourceController } from './controllers/admin/plantinit/source.controller';
import { RevertPlantInitController } from './controllers/admin/plantinit/revert-init-plant.controller';
import { addController } from './controllers/admin/plantinit/add.controller';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    RabbitMQModule.register([
      { name: ADMIN_RABBITMQ_SERVICE, queue: ADMIN_RABBITMQ_QUEUE },
    ]),
  ],
  controllers: [
    EntityTypeController,
    EntityFieldController,
    EntityController,
    ChartController,
    ChartDetailsController,
    DetailFieldController,
    PlantInitController,
    RevertPlantInitController,
    SourceController,
    addController,
  ],
  // providers: [
  //   {
  //     provide: APP_FILTER,
  //     useClass: AllExceptionsFilter,
  //   },
  // ],
})
export class AppModule {}
