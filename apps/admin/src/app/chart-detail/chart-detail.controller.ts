import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CHART_DETAILS_CREATED,
  CHART_DETAILS_REMOVED,
  CHART_DETAILS_UPDATED,
  CHART_DETAILS_READ,
  ReadChartDto,
  CreateChartDto,
  UpdateChartDto,
  ChartIdDto,
  ChartDetailIdDto,
  UpdateChartDetailDto,
  CreateChartDetailDto,
} from '@sephrmicroservice-monorepo/common';
import { ChartDetailService } from './chart-detail.service';

@Controller()
export class ChartDetailMicroserviceController {
  constructor(private readonly chartDetailsService: ChartDetailService) {}

  @MessagePattern(CHART_DETAILS_READ)
  async find(@Payload() chartIdDto: ChartIdDto) {
    return await this.chartDetailsService.read(chartIdDto);
  }

  @MessagePattern(CHART_DETAILS_CREATED)
  async create(@Payload() createChartDetailDto: CreateChartDetailDto) {
    return await this.chartDetailsService.add(createChartDetailDto);
  }

  @MessagePattern(CHART_DETAILS_UPDATED)
  async update(@Payload() updateChartDetailDto: UpdateChartDetailDto) {
    return await this.chartDetailsService.modify(updateChartDetailDto);
  }

  @MessagePattern(CHART_DETAILS_REMOVED)
  async delete(@Payload() chartDetailIdDto: ChartDetailIdDto) {
    return await this.chartDetailsService.remove(chartDetailIdDto);
  }
}
