import { Module } from '@nestjs/common';
import { EntityFieldController } from './controllers/admin/entities/entity-field.controller';
import { EntityTypeController } from './controllers/admin/entities/entity-type.controller';
import {
  ADMIN_RABBITMQ_QUEUE,
  ADMIN_RABBITMQ_SERVICE,
  RabbitMQModule,
} from '@sephrmicroservice-monorepo/common';
import { EntityController } from './controllers/admin/entities/entity.controller';
import { ChartController } from './controllers/admin/charts/chart.controller';
import { ChartDetailsController } from './controllers/admin/charts/chart-detail.controller';
import { DetailFieldController } from './controllers/admin/charts/detail-field.controller';
import { PlantInitController } from './controllers/admin/plantinit/init-plant.controller';

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
  ],
})
export class AppModule {}
