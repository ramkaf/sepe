import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ADMIN_RABBITMQ_SERVICE,
  CHART_DETAILS_CREATED,
  CHART_DETAILS_READ,
  CHART_DETAILS_REMOVED,
  CHART_DETAILS_UPDATED,
  ChartDetailIdDto,
  ChartIdDto,
  CreateChartDetailDto,
  UpdateChartDetailDto,
} from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('/admin/chart-details')
export class ChartDetailsController {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  @Get()
  async getChartDetailss(@Query() data: ChartIdDto) {
    const result = this.rabbitClient.send(CHART_DETAILS_READ, data);
    return firstValueFrom(result);
  }

  @Post()
  async createChartDetails(@Body() data: CreateChartDetailDto) {
    const result = this.rabbitClient.send(CHART_DETAILS_CREATED, data);
    return firstValueFrom(result);
  }

  @Patch()
  async updateChartDetails(@Body() data: UpdateChartDetailDto) {
    const result = this.rabbitClient.send(CHART_DETAILS_UPDATED, data);
    return firstValueFrom(result);
  }

  @Delete()
  async deleteChartDetails(@Query() data: ChartDetailIdDto) {
    const result = this.rabbitClient.send(CHART_DETAILS_REMOVED, data);
    return firstValueFrom(result);
  }
}
