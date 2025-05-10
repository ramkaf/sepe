import { Module } from '@nestjs/common';
import { ChartDetailService } from './chart-detail.service';
import { ChartDetailMicroserviceController } from './chart-detail.controller';
import {
  ADMIN_RABBITMQ_QUEUE,
  ADMIN_RABBITMQ_SERVICE,
  ChartDetail,
  RabbitMQModule,
} from '@sephrmicroservice-monorepo/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    RabbitMQModule.register([
      { name: ADMIN_RABBITMQ_SERVICE, queue: ADMIN_RABBITMQ_QUEUE },
    ]),
    TypeOrmModule.forFeature([ChartDetail]),
  ],
  controllers: [ChartDetailMicroserviceController],
  providers: [ChartDetailService],
})
export class ChartDetailModule {}
