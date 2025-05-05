import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ADMIN_RABBITMQ_SERVICE,
  CreateEntityFieldArrayDto,
  CreateEntityFieldDto,
  EntityField,
  EntityFieldIdDto,
  GetEntityFieldArrayByIdDto,
  UpdateEntityFieldDto,
  UpdateMultipleEntityFieldArrayDto,
} from '@sephrmicroservice-monorepo/common';
import { browserGroupEntity } from 'common/src/lib/database/postgresql/entities/browser-group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EntityFieldService {
  constructor(
    @InjectRepository(EntityField)
    private readonly entityFieldRepository: Repository<EntityField>,
    @InjectRepository(browserGroupEntity)
    private readonly browserGroupRepository: Repository<browserGroupEntity>
  ) {}

  // async read(readEntityFieldDto: ReadEntityFieldDto) {
  //   const { efId, tag, plantId } = readEntityFieldDto;
  //   const queryBuilder =
  //     this.entityFieldRepository.createQueryBuilder('entityType');

  //   if (efId !== undefined)
  //     queryBuilder.andWhere('entityType.efId = :efId', { efId });

  //   if (plantId !== undefined)
  //     queryBuilder.andWhere('entityType.plantId = :plantId', { plantId });

  //   if (tag !== undefined)
  //     queryBuilder.andWhere('entityType.tag = :tag', { tag });

  //   const entityTypes = await queryBuilder.getMany();
  //   return entityTypes;
  // }

  async add(createEntityFieldDto: CreateEntityFieldDto): Promise<EntityField> {
    const { browserGroup, ...rest } = createEntityFieldDto;
    const entityFieldSchema = this.entityFieldRepository.create(rest);
    const entityField = await this.entityFieldRepository.save(
      entityFieldSchema
    );
    const browserGroups: browserGroupEntity[] = [];
    for (const group of browserGroup) {
      const bg = new browserGroupEntity();
      bg.name = group;
      bg.entityField = entityField;
      browserGroups.push(bg);
    }
    await this.browserGroupRepository.save(browserGroups);
    return this.entityFieldRepository.findOne({
      where: { efId: entityField.efId },
      relations: ['browserGroup'],
    });
  }

  // async addMany(
  //   createEntityFieldArrayDto: CreateEntityFieldArrayDto
  // ): Promise<EntityField[]> {
  //   return await Promise.all(
  //     createEntityFieldArrayDto.data.map(
  //       async (createEntityFieldDto: CreateEntityFieldDto) => {
  //         return await this.add(createEntityFieldDto);
  //       }
  //     )
  //   );
  // }

  // async modify(
  //   updateEntityFieldDto: UpdateEntityFieldDto
  // ): Promise<EntityField> {
  //   const { efId, ...updateData } = updateEntityFieldDto;
  //   const entityType = await this.entityFieldRepository.findOne({
  //     where: { efId },
  //   });
  //   if (!entityType) {
  //     throw new Error(`EntityField with efId ${efId} not found`);
  //   }
  //   Object.assign(entityType, updateData);
  //   return await this.entityFieldRepository.save(entityType);
  // }

  // async modifyMany(
  //   updateEntityFieldArrayDto: UpdateMultipleEntityFieldArrayDto
  // ): Promise<EntityField[]> {
  //   return await Promise.all(
  //     updateEntityFieldArrayDto.data.map(async (dto: UpdateEntityFieldDto) => {
  //       return await this.modify(dto);
  //     })
  //   );
  // }

  // async remove(entityTypeIdDto: EntityFieldIdDto): Promise<EntityField> {
  //   const { efId } = entityTypeIdDto;
  //   const entityField = await this.entityFieldRepository.findOne({
  //     where: { efId },
  //   });
  //   if (!entityField) {
  //     throw new Error(`EntityField with efId ${efId} not found`);
  //   }
  //   return await this.entityFieldRepository.remove(entityField);
  // }

  // async removeMany(
  //   getEntityFieldByIdArrayDto: GetEntityFieldArrayByIdDto
  // ): Promise<EntityField[]> {
  //   return await Promise.all(
  //     getEntityFieldByIdArrayDto.data.map(async (dto: EntityFieldIdDto) => {
  //       return await this.remove(dto);
  //     })
  //   );
  // }
}
