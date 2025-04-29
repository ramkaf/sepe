import { Module } from '@nestjs/common';
import { ChartEntityService } from './chart-entity.service';
import { ChartEntityController } from './chart-entity.controller';

@Module({
  controllers: [ChartEntityController],
  providers: [ChartEntityService],
})
export class ChartEntityModule {}
