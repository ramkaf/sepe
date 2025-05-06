import { Module } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ChartMicroserviceController } from './chart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ADMIN_RABBITMQ_QUEUE,
  ADMIN_RABBITMQ_SERVICE,
  Chart,
  RabbitMQModule,
} from '@sephrmicroservice-monorepo/common';

@Module({
  imports: [
    RabbitMQModule.register([
      { name: ADMIN_RABBITMQ_SERVICE, queue: ADMIN_RABBITMQ_QUEUE },
    ]),
    TypeOrmModule.forFeature([Chart]),
  ],
  controllers: [ChartMicroserviceController],
  providers: [ChartService],
})
export class ChartModule {}
