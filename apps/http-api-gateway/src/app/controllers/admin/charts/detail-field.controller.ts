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
  CreateDetailFieldDto,
  DETAIL_FIELD_CREATED,
  DETAIL_FIELD_READ,
  DETAIL_FIELD_REMOVED,
  DETAIL_FIELD_UPDATED,
  UpdateDetailFieldDto,
  DetailFieldIdDto,
} from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('/admin/chart-detail-field')
export class DetailFieldController {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  @Get()
  async getDetailFields() {
    const result = this.rabbitClient.send(DETAIL_FIELD_READ, {});
    return firstValueFrom(result);
  }

  @Post()
  async createDetailField(@Body() data: CreateDetailFieldDto) {
    const result = this.rabbitClient.send(DETAIL_FIELD_CREATED, data);
    return firstValueFrom(result);
  }

  @Patch()
  async updateDetailField(@Body() data: UpdateDetailFieldDto) {
    const result = this.rabbitClient.send(DETAIL_FIELD_UPDATED, data);
    return firstValueFrom(result);
  }

  @Delete()
  async deleteDetailField(@Query() data: DetailFieldIdDto) {
    const result = this.rabbitClient.send(DETAIL_FIELD_REMOVED, data);
    return firstValueFrom(result);
  }
}
