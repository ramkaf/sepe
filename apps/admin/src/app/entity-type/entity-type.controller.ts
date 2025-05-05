import { Controller, Get, Inject } from '@nestjs/common';
import { EntityTypeService } from './entity-type.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
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

@Controller()
export class EntityTypeMicroserviceController {
  constructor(private readonly entityTypeService: EntityTypeService) {}

  @MessagePattern(ENTITY_TYPE_MULTIPLE_READ)
  async find(@Payload() readEntityTypeDto: ReadEntityTypeDto) {
    return await this.entityTypeService.read(readEntityTypeDto);
  }

  @MessagePattern(ENTITY_TYPE_CREATED)
  async create(@Payload() createEntityTypeDto: CreateEntityTypeDto) {
    return await this.entityTypeService.add(createEntityTypeDto);
  }

  @MessagePattern(ENTITY_TYPE_MULTIPLE_CREATED)
  async createMany(
    @Payload() createEntityTypeArrayDto: CreateEntityTypeArrayDto
  ) {
    return await this.entityTypeService.addMany(createEntityTypeArrayDto);
  }

  @MessagePattern(ENTITY_TYPE_UPDATED)
  async update(@Payload() updateEntityTypeDto: UpdateEntityTypeDto) {
    return await this.entityTypeService.modify(updateEntityTypeDto);
  }

  @MessagePattern(ENTITY_TYPE_MULTIPLE_UPDATED)
  async updateMany(
    @Payload() updateMultipleEntityTypeDto: UpdateMultipleEntityTypeDto
  ) {
    return await this.entityTypeService.modifyMany(updateMultipleEntityTypeDto);
  }

  @MessagePattern(ENTITY_TYPE_REMOVED)
  async delete(@Payload() entityTypeIdDto: EntityTypeIdDto) {
    return await this.entityTypeService.remove(entityTypeIdDto);
  }

  @MessagePattern(ENTITY_TYPE_MULTIPLE_REMOVED)
  async deleteMany(
    @Payload() getEntityTypeByIdArrayDto: GetEntityTypeByIdArrayDto
  ) {
    return await this.entityTypeService.removeMany(getEntityTypeByIdArrayDto);
  }
}
