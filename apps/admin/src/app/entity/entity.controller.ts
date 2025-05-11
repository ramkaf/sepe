import { Controller } from '@nestjs/common';
import { EntityService } from './entity.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ENTITY_CREATED,
  ENTITY_READ,
  ENTITY_UPDATED,
  ENTITY_REMOVED,
  ENTITY_MULTIPLE_CREATED,
  ENTITY_MULTIPLE_UPDATED,
  ENTITY_MULTIPLE_REMOVED,
  CreateEntityDto,
  UpdateEntityDto,
  EntityIdDto,
  ReadEntityDto,
  CreateMultipleEntityDto,
  UpdateMultipleEntityDto,
  GetMultipleEntityByIdDto,
  INITIATE_PLANT_TAG,
  PlantIdDto,
  PlantTagDto,
} from '@sephrmicroservice-monorepo/common';

@Controller('admin/entity')
export class EntityMicroserviceController {
  constructor(private readonly entityService: EntityService) {}

  @MessagePattern(ENTITY_READ)
  async find(@Payload() readEntityDto: ReadEntityDto) {
    return await this.entityService.read(readEntityDto);
  }

  @MessagePattern(ENTITY_CREATED)
  async create(@Payload() createEntityDto: CreateEntityDto) {
    return await this.entityService.add(createEntityDto);
  }

  @MessagePattern(ENTITY_MULTIPLE_CREATED)
  async createMany(@Payload() createEntityArrayDto: CreateMultipleEntityDto) {
    return await this.entityService.addMany(createEntityArrayDto);
  }

  @MessagePattern(ENTITY_UPDATED)
  async update(@Payload() updateEntityDto: UpdateEntityDto) {
    return await this.entityService.modify(updateEntityDto);
  }

  @MessagePattern(ENTITY_MULTIPLE_UPDATED)
  async updateMany(@Payload() updateEntityDto: UpdateMultipleEntityDto) {
    return await this.entityService.modifyMany(updateEntityDto);
  }

  @MessagePattern(ENTITY_REMOVED)
  async delete(@Payload() entityFieldIdDto: EntityIdDto) {
    return await this.entityService.remove(entityFieldIdDto);
  }

  @MessagePattern(ENTITY_MULTIPLE_REMOVED)
  async deleteMany(@Payload() getEntityArrayByIdDto: GetMultipleEntityByIdDto) {
    return await this.entityService.removeMany(getEntityArrayByIdDto);
  }
}
