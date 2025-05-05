import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntityFieldService } from './entity-field.service';
import {
  CreateEntityFieldArrayDto,
  CreateEntityFieldDto,
  ENTITY_FIELD_CREATED,
  ENTITY_FIELD_MULTIPLE_CREATED,
  ENTITY_FIELD_MULTIPLE_REMOVED,
  ENTITY_FIELD_MULTIPLE_UPDATED,
  ENTITY_FIELD_REMOVED,
  ENTITY_FIELD_UPDATED,
  EntityFieldIdDto,
  GetEntityFieldByIdArrayDto,
  UpdateEntityFieldDto,
  UpdateMultipleEntityFieldDto,
} from '@sephrmicroservice-monorepo/common';

@Controller()
export class EntityFieldMicroserviceController {
  constructor(private readonly entityFieldService: EntityFieldService) {}
  //  @MessagePattern(ENTITY_FIELD_READ)
  //   async find(@Payload() readEntityFieldDto: ReadEntityFieldDto) {
  //     return await this.entityFieldService.read(readEntityFieldDto);
  //   }

  @MessagePattern(ENTITY_FIELD_CREATED)
  async create(@Payload() createEntityFieldDto: CreateEntityFieldDto) {
    return await this.entityFieldService.add(createEntityFieldDto);
  }

  @MessagePattern(ENTITY_FIELD_MULTIPLE_CREATED)
  async createMany(
    @Payload() createEntityFieldArrayDto: CreateEntityFieldArrayDto
  ) {
    return await this.entityFieldService.addMany(createEntityFieldArrayDto);
  }

  @MessagePattern(ENTITY_FIELD_UPDATED)
  async update(@Payload() updateEntityFieldDto: UpdateEntityFieldDto) {
    return await this.entityFieldService.modify(updateEntityFieldDto);
  }

  @MessagePattern(ENTITY_FIELD_MULTIPLE_UPDATED)
  async updateMany(
    @Payload() updateEntityFieldDto: UpdateMultipleEntityFieldDto
  ) {
    return await this.entityFieldService.modifyMany(updateEntityFieldDto);
  }

  // @MessagePattern(ENTITY_FIELD_MULTIPLE_UPDATED)
  // async updateMany(
  //   @Payload() updateMultipleEntityFieldDto: UpdateMultipleEntityFieldArrayDto
  // ) {
  //   return await this.entityFieldService.modifyMany(updateMultipleEntityFieldDto);
  // }

  @MessagePattern(ENTITY_FIELD_REMOVED)
  async delete(@Payload() entityFieldIdDto: EntityFieldIdDto) {
    return await this.entityFieldService.remove(entityFieldIdDto);
  }

  @MessagePattern(ENTITY_FIELD_MULTIPLE_REMOVED)
  async deleteMany(
    @Payload() getEntityFieldArrayByIdDto: GetEntityFieldByIdArrayDto
  ) {
    return await this.entityFieldService.removeMany(getEntityFieldArrayByIdDto);
  }
}
