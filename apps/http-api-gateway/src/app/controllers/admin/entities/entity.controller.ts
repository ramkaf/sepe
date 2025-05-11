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
  CreateEntityDto,
  CreateMultipleEntityDto,
  ENTITY_CREATED,
  ENTITY_MULTIPLE_CREATED,
  ENTITY_MULTIPLE_REMOVED,
  ENTITY_MULTIPLE_UPDATED,
  ENTITY_READ,
  ENTITY_REMOVED,
  ENTITY_UPDATED,
  EntityIdDto,
  GetMultipleEntityByIdDto,
  PlantTagDto,
  ReadEntityDto,
  UpdateEntityDto,
  UpdateMultipleEntityDto,
} from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('admin/entity')
export class EntityController {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  @Get()
  async getEntitys(@Body() data: ReadEntityDto) {
    const result = this.rabbitClient.send(ENTITY_READ, data);
    return firstValueFrom(result);
  }

  @Post()
  async createEntity(@Body() data: CreateEntityDto) {
    const result = this.rabbitClient.send(ENTITY_CREATED, data);
    return firstValueFrom(result);
  }

  @Post('/many')
  async createManyEntity(@Body() data: CreateMultipleEntityDto) {
    const result = this.rabbitClient.send(ENTITY_MULTIPLE_CREATED, data);
    return firstValueFrom(result);
  }

  @Patch()
  async updateEntity(@Body() data: UpdateEntityDto) {
    const result = this.rabbitClient.send(ENTITY_UPDATED, data);
    return firstValueFrom(result);
  }

  @Patch('/many')
  async updateManyEntity(@Body() data: UpdateMultipleEntityDto) {
    const result = this.rabbitClient.send(ENTITY_MULTIPLE_UPDATED, data);
    return firstValueFrom(result);
  }

  @Delete()
  async deleteEntity(@Query() data: EntityIdDto) {
    const result = this.rabbitClient.send(ENTITY_REMOVED, data);
    return firstValueFrom(result);
  }

  @Delete('/many')
  async deleteManyEntity(@Body() data: GetMultipleEntityByIdDto) {
    const result = this.rabbitClient.send(ENTITY_MULTIPLE_REMOVED, data);
    return firstValueFrom(result);
  }
}
