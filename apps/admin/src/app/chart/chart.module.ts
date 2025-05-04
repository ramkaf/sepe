import { Module } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ChartMicroserviceController } from './chart.controller';

@Module({
  controllers: [ChartMicroserviceController],
  providers: [ChartService],
})
export class ChartModule {}
