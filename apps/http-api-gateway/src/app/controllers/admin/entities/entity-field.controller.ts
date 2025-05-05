import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ADMIN_RABBITMQ_SERVICE,
  CreateEntityFieldArrayDto,
  CreateEntityFieldDto,
  ENTITY_FIELD_CREATED,
  ENTITY_FIELD_MULTIPLE_CREATED,
} from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('/admin/entity-field')
export class EntityFieldController {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  @Post()
  async createEntityField(@Body() data: CreateEntityFieldDto) {
    const result = this.rabbitClient.send(ENTITY_FIELD_CREATED, data);
    return firstValueFrom(result);
  }

  @Post('/many')
  async createManyEntityField(@Body() data: CreateEntityFieldArrayDto) {
    const result = this.rabbitClient.send(ENTITY_FIELD_MULTIPLE_CREATED, data);
    return firstValueFrom(result);
  }
}
