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
  BROWSER_GROUP_READ,
  CreateMultipleEntityFieldDto,
  CreateEntityFieldDto,
  ENTITY_FIELD_CREATED,
  ENTITY_FIELD_MULTIPLE_CREATED,
  ENTITY_FIELD_MULTIPLE_REMOVED,
  ENTITY_FIELD_MULTIPLE_UPDATED,
  ENTITY_FIELD_READ,
  ENTITY_FIELD_REMOVED,
  ENTITY_FIELD_UPDATED,
  EntityFieldIdDto,
  GetEntityFieldByIdArrayDto,
  ReadEntityFieldDto,
  UpdateEntityFieldDto,
  UpdateMultipleEntityFieldDto,
} from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('/admin/entity-field')
export class EntityFieldController {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  @Get()
  async getEntityFields(@Body() data: ReadEntityFieldDto) {
    const result = this.rabbitClient.send(ENTITY_FIELD_READ, data);
    return firstValueFrom(result);
  }

  @Get('browser-groups')
  async getBrowserGroupOptions() {
    const result = this.rabbitClient.send(BROWSER_GROUP_READ, {});
    return firstValueFrom(result);
  }

  @Post()
  async createEntityField(@Body() data: CreateEntityFieldDto) {
    const result = this.rabbitClient.send(ENTITY_FIELD_CREATED, data);
    return firstValueFrom(result);
  }

  @Post('/many')
  async createManyEntityField(@Body() data: CreateMultipleEntityFieldDto) {
    const result = this.rabbitClient.send(ENTITY_FIELD_MULTIPLE_CREATED, data);
    return firstValueFrom(result);
  }

  @Patch()
  async updateEntityField(@Body() data: UpdateEntityFieldDto) {
    const result = this.rabbitClient.send(ENTITY_FIELD_UPDATED, data);
    return firstValueFrom(result);
  }

  @Patch('/many')
  async updateManyEntityField(@Body() data: UpdateMultipleEntityFieldDto) {
    const result = this.rabbitClient.send(ENTITY_FIELD_MULTIPLE_UPDATED, data);
    return firstValueFrom(result);
  }

  @Delete()
  async deleteEntityField(@Query() data: EntityFieldIdDto) {
    const result = this.rabbitClient.send(ENTITY_FIELD_REMOVED, data);
    return firstValueFrom(result);
  }

  @Delete('/many')
  async deleteManyEntityField(@Body() data: GetEntityFieldByIdArrayDto) {
    const result = this.rabbitClient.send(ENTITY_FIELD_MULTIPLE_REMOVED, data);
    return firstValueFrom(result);
  }
}
