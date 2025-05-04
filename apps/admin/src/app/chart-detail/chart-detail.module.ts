import { Module } from '@nestjs/common';
import { ChartDetailService } from './chart-detail.service';
import { ChartDetailMicroserviceController } from './chart-detail.controller';

@Module({
  controllers: [ChartDetailMicroserviceController],
  providers: [ChartDetailService],
})
export class ChartDetailModule {}
