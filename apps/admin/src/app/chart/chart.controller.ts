import {
  Controller,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CHART_READ , CHART_CREATED , CHART_REMOVED , CHART_UPDATED, ChartIdDto, CreateChartDto, ReadChartDto, UpdateChartDto } from '@sephrmicroservice-monorepo/common';
import { ChartService } from './chart.service';
@Controller('chart')
export class ChartMicroserviceController {
   constructor(private readonly chartService: ChartService) {}
  
    @MessagePattern(CHART_READ)
    async find(@Payload() readChartDto: ReadChartDto) {
      return await this.chartService.read(readChartDto);
    }
  
    @MessagePattern(CHART_CREATED)
    async create(@Payload() createChartDto: CreateChartDto) {
      return await this.chartService.add(createChartDto);
    }
  
    @MessagePattern(CHART_UPDATED)
    async update(@Payload() updateChartDto: UpdateChartDto) {
      return await this.chartService.modify(updateChartDto);
    }
  
  
    @MessagePattern(CHART_REMOVED)
    async delete(@Payload() entityFieldIdDto: ChartIdDto) {
      return await this.chartService.remove(entityFieldIdDto);
    }
}
