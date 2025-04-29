import { Module } from '@nestjs/common';
import { ChartDetailService } from './chart-detail.service';
import { ChartDetailController } from './chart-detail.controller';

@Module({
  controllers: [ChartDetailController],
  providers: [ChartDetailService],
})
export class ChartDetailModule {}
