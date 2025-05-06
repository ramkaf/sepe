import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateEntityDto,
  CreateMultipleEntityDto,
  EntityIdDto,
  EntityModel,
  GetMultipleEntityByIdDto,
  PlantIdDto,
  ReadEntityDto,
  UpdateEntityDto,
  UpdateMultipleEntityDto,
} from '@sephrmicroservice-monorepo/common';
import { Repository } from 'typeorm';

@Injectable()
export class EntityService {
  constructor(
    @InjectRepository(EntityModel)
    private readonly entityRepository: Repository<EntityModel>
  ) {}

  async read(readEntityDto: ReadEntityDto) {
    const { etId, entityName, entityTag, entityTagLike, parentInTreeId } =
      readEntityDto;
    const queryBuilder = this.entityRepository.createQueryBuilder('entity');

    if (etId !== undefined)
      queryBuilder.andWhere('entity.etId = :etId', { etId });

    if (entityName !== undefined)
      queryBuilder.andWhere('entity.entityName = :entityName', { entityName });

    if (entityTag !== undefined)
      queryBuilder.andWhere('entity.entityTag = :entityTag', { entityTag });

    if (entityTagLike !== undefined && entityTagLike.trim() !== '') {
      // Fix: Proper usage of LIKE in TypeORM
      queryBuilder.andWhere('entity.entityTag LIKE :entityTagLike', {
        entityTagLike: `%${entityTagLike}%`,
      });
    }

    if (parentInTreeId !== undefined)
      queryBuilder.andWhere('entity.parentInTreeId = :parentInTreeId', {
        parentInTreeId,
      });

    console.log('Generated SQL:', queryBuilder.getSql());
    console.log('Query parameters:', queryBuilder.getParameters());

    const entities = await queryBuilder.getMany();
    return entities;
  }

  async add(createEntityDto: CreateEntityDto): Promise<EntityModel> {
    const { entityName, entityTag, parentInTreeId, etId } = createEntityDto;
    const entity = this.entityRepository.create({
      entityName,
      entityTag,
      parentInTreeId,
      etId,
    });
    return await this.entityRepository.save(entity);
  }

  async addMany(
    createEntityArrayDto: CreateMultipleEntityDto
  ): Promise<EntityModel[]> {
    return await Promise.all(
      createEntityArrayDto.data.map(
        async (createEntityDto: CreateEntityDto) => {
          return await this.add(createEntityDto);
        }
      )
    );
  }

  async modify(updateEntityDto: UpdateEntityDto): Promise<EntityModel> {
    const { eId, ...updateData } = updateEntityDto;
    const entity = await this.entityRepository.findOne({
      where: { eId },
    });
    if (!entity) {
      throw new Error(`Entity with eId ${eId} not found`);
    }
    Object.assign(entity, updateData);
    return await this.entityRepository.save(entity);
  }

  async modifyMany(
    updateEntityArrayDto: UpdateMultipleEntityDto
  ): Promise<EntityModel[]> {
    return await Promise.all(
      updateEntityArrayDto.data.map(async (dto: UpdateEntityDto) => {
        return await this.modify(dto);
      })
    );
  }

  async remove(entityIdDto: EntityIdDto): Promise<EntityModel> {
    const { eId } = entityIdDto;
    const entity = await this.entityRepository.findOne({
      where: { eId },
    });
    if (!entity) {
      throw new Error(`Entity with eId ${eId} not found`);
    }
    return await this.entityRepository.remove(entity);
  }

  async removeMany(
    getEntityByIdArrayDto: GetMultipleEntityByIdDto
  ): Promise<EntityModel[]> {
    return await Promise.all(
      getEntityByIdArrayDto.data.map(async (dto: EntityIdDto) => {
        return await this.remove(dto);
      })
    );
  }

  //todo
  // async readEntitiesOfAPlant(plantIdDto:PlantIdDto){

  // }
}
