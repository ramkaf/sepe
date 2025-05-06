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
  CreateChartDto,
  CHART_CREATED,
  CHART_READ,
  CHART_REMOVED,
  CHART_UPDATED,
  ChartIdDto,
  ReadChartDto,
  UpdateChartDto,
} from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('/admin/charts')
export class ChartController {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  @Get()
  async getCharts(@Query() data: ReadChartDto) {
    const result = this.rabbitClient.send(CHART_READ, data);
    return firstValueFrom(result);
  }

  @Post()
  async createChart(@Body() data: CreateChartDto) {
    const result = this.rabbitClient.send(CHART_CREATED, data);
    return firstValueFrom(result);
  }

  @Patch()
  async updateChart(@Body() data: UpdateChartDto) {
    const result = this.rabbitClient.send(CHART_UPDATED, data);
    return firstValueFrom(result);
  }

  @Delete()
  async deleteChart(@Query() data: ChartIdDto) {
    const result = this.rabbitClient.send(CHART_REMOVED, data);
    return firstValueFrom(result);
  }
}
