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
  CreateEntityTypeArrayDto,
  CreateEntityTypeDto,
  ENTITY_TYPE_CREATED,
  ENTITY_TYPE_MULTIPLE_CREATED,
  ENTITY_TYPE_MULTIPLE_READ,
  ENTITY_TYPE_MULTIPLE_REMOVED,
  ENTITY_TYPE_MULTIPLE_UPDATED,
  ENTITY_TYPE_REMOVED,
  ENTITY_TYPE_UPDATED,
  EntityTypeIdDto,
  GetEntityTypeByIdArrayDto,
  ReadEntityTypeDto,
  UpdateEntityTypeDto,
  UpdateMultipleEntityTypeDto,
} from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('admin/entity-type')
export class EntityTypeController {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  @Get()
  async findEntityType(@Query() data: ReadEntityTypeDto) {
    const result = this.rabbitClient.send(ENTITY_TYPE_MULTIPLE_READ, data);
    return firstValueFrom(result);
  }

  @Post()
  async createEntityType(@Body() data: CreateEntityTypeDto) {
    const result = this.rabbitClient.send(ENTITY_TYPE_CREATED, data);
    return firstValueFrom(result);
  }

  @Post('/many')
  async createManyEntityType(@Body() data: CreateEntityTypeArrayDto) {
    const result = this.rabbitClient.send(ENTITY_TYPE_MULTIPLE_CREATED, data);
    return firstValueFrom(result);
  }

  @Patch()
  async updateEntityType(@Body() data: UpdateEntityTypeDto) {
    const result = this.rabbitClient.send(ENTITY_TYPE_UPDATED, data);
    return firstValueFrom(result);
  }

  @Patch('/many')
  async updateManyEntityType(@Body() data: UpdateMultipleEntityTypeDto) {
    const result = this.rabbitClient.send(ENTITY_TYPE_MULTIPLE_UPDATED, data);
    return firstValueFrom(result);
  }

  @Delete()
  async deleteEntityType(@Query() data: EntityTypeIdDto) {
    console.log(data);
    
    const result = this.rabbitClient.send(ENTITY_TYPE_REMOVED, data);
    return firstValueFrom(result);
  }

  @Delete('/many')
  async deleteManyEntityType(@Body() data: GetEntityTypeByIdArrayDto) {
    const result = this.rabbitClient.send(ENTITY_TYPE_MULTIPLE_REMOVED, data);
    return firstValueFrom(result);
  }
}
