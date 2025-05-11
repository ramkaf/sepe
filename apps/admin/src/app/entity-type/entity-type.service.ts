import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateMultipleEntityTypeDto,
  CreateEntityTypeDto,
  EntityType,
  EntityTypeIdDto,
  GetEntityTypeByIdArrayDto,
  ReadEntityTypeDto,
  UpdateEntityTypeDto,
  UpdateMultipleEntityTypeDto,
} from '@sephrmicroservice-monorepo/common';
import { Repository } from 'typeorm';

@Injectable()
export class EntityTypeService {
  constructor(
    @InjectRepository(EntityType)
    private readonly entityTypeRepository: Repository<EntityType>
  ) {}

  async read(readEntityTypeDto: ReadEntityTypeDto) {
    const { etId, tag, plantId } = readEntityTypeDto;
    const queryBuilder =
      this.entityTypeRepository.createQueryBuilder('entityType');

    if (etId !== undefined)
      queryBuilder.andWhere('entityType.etId = :etId', { etId });

    if (plantId !== undefined)
      queryBuilder.andWhere('entityType.plantId = :plantId', { plantId });

    if (tag !== undefined)
      queryBuilder.andWhere('entityType.tag = :tag', { tag });

    const entityTypes = await queryBuilder.getMany();
    return entityTypes;
  }

  async add(createEntityTypeDto: CreateEntityTypeDto): Promise<EntityType> {
    const { name, tag, abstractionLevel, description, plantId } =
      createEntityTypeDto;
    const entityType = this.entityTypeRepository.create({
      name,
      tag,
      abstractionLevel,
      description,
      plantId,
    });
    return await this.entityTypeRepository.save(entityType);
  }

  async addMany(
    createEntityTypeArrayDto: CreateMultipleEntityTypeDto
  ): Promise<EntityType[]> {
    return await Promise.all(
      createEntityTypeArrayDto.data.map(
        async (createEntityTypeDto: CreateEntityTypeDto) => {
          return await this.add(createEntityTypeDto);
        }
      )
    );
  }

  async modify(updateEntityTypeDto: UpdateEntityTypeDto): Promise<EntityType> {
    const { etId, ...updateData } = updateEntityTypeDto;
    const entityType = await this.entityTypeRepository.findOne({
      where: { etId },
    });
    if (!entityType) {
      throw new Error(`EntityType with etId ${etId} not found`);
    }
    Object.assign(entityType, updateData);
    return await this.entityTypeRepository.save(entityType);
  }

  async modifyMany(
    updateEntityTypeArrayDto: UpdateMultipleEntityTypeDto
  ): Promise<EntityType[]> {
    return await Promise.all(
      updateEntityTypeArrayDto.data.map(async (dto: UpdateEntityTypeDto) => {
        return await this.modify(dto);
      })
    );
  }

  async remove(entityTypeIdDto: EntityTypeIdDto): Promise<EntityType> {
    const { etId } = entityTypeIdDto;
    const entityType = await this.entityTypeRepository.findOne({
      where: { etId },
    });
    if (!entityType) {
      throw new Error(`EntityType with etId ${etId} not found`);
    }
    return await this.entityTypeRepository.remove(entityType);
  }

  async removeMany(
    getEntityTypeByIdArrayDto: GetEntityTypeByIdArrayDto
  ): Promise<EntityType[]> {
    return await Promise.all(
      getEntityTypeByIdArrayDto.data.map(async (dto: EntityTypeIdDto) => {
        return await this.remove(dto);
      })
    );
  }
}
