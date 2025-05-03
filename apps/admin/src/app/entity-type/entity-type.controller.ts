import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import {
  CreateEntityTypeArrayDto,
  ENTITY_TYPE_MULTIPLE_CREATED,
  ENTITY_TYPE_MULTIPLE_READ,
  ENTITY_TYPE_MULTIPLE_REMOVED,
  ENTITY_TYPE_MULTIPLE_UPDATED,
  RABBITMQ_SERVICE,
} from '@sephrmicroservice-monorepo/common';

@Controller('admin/entity-type/multiple')
export class EntityTypeController {
  constructor(@Inject(RABBITMQ_SERVICE) private client: ClientProxy) {}

  @Get()
  async get(@Body() data: any) {
    this.client.emit(ENTITY_TYPE_MULTIPLE_READ, { data });
    return { status: 'sent' };
  }
  @Post()
  async create(@Body() data: any) {
    this.client.emit(ENTITY_TYPE_MULTIPLE_CREATED, { data });
    return { status: 'sent' };
  }
  @Patch()
  async patch(@Body() data: any) {
    this.client.emit(ENTITY_TYPE_MULTIPLE_UPDATED, { data });
    return { status: 'sent' };
  }
  @Delete()
  async remove(@Body() data: any) {
    this.client.emit(ENTITY_TYPE_MULTIPLE_REMOVED, { data });
    return { status: 'sent' };
  }
}
