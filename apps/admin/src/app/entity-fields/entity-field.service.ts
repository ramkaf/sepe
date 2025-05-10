import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BrowserGroupEnum,
  CreateEntityFieldArrayDto,
  CreateEntityFieldDto,
  EntityField,
  EntityFieldIdDto,
  GetEntityFieldByIdArrayDto,
  ReadEntityFieldDto,
  UpdateEntityFieldDto,
  UpdateMultipleEntityFieldDto,
} from '@sephrmicroservice-monorepo/common';
import { browserGroupEntity } from 'common/src/lib/database/postgresql/entities/browser-group.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class EntityFieldService {
  constructor(
    @InjectRepository(EntityField)
    private readonly entityFieldRepository: Repository<EntityField>,
    @InjectRepository(browserGroupEntity)
    private readonly browserGroupRepository: Repository<browserGroupEntity>
  ) {}
  async read(readEntityFieldDto: ReadEntityFieldDto): Promise<EntityField[]> {
    const query = this.buildSearchQuery(readEntityFieldDto);
    if (
      readEntityFieldDto.browserGroups &&
      readEntityFieldDto.browserGroups.length > 0
    ) {
      query.leftJoinAndSelect('entityField.browserGroup', 'browserGroup');
    }

    return await query.getMany();
  }

  async add(createEntityFieldDto: CreateEntityFieldDto): Promise<EntityField> {
    const { browserGroup, ...rest } = createEntityFieldDto;
    const { fieldTag, etId } = createEntityFieldDto;
    const ensureEntityTagNotExist = await this.entityFieldRepository.find({
      where: {
        fieldTag,
        etId,
      },
    });
    
    if (ensureEntityTagNotExist)
      throw new ConflictException(
        `fieldTag:${fieldTag} are exist for entity type id :${etId}`
      );

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

  async addMany(
    createEntityFieldArrayDto: CreateEntityFieldArrayDto
  ): Promise<EntityField[]> {
    return await Promise.all(
      createEntityFieldArrayDto.data.map(
        async (createEntityFieldDto: CreateEntityFieldDto) => {
          return await this.add(createEntityFieldDto);
        }
      )
    );
  }

  async modify(
    updateEntityFieldDto: UpdateEntityFieldDto
  ): Promise<EntityField> {
    const { efId, browserGroup, ...rest } = updateEntityFieldDto;
    await this.entityFieldRepository.update({ efId }, rest);
    const entityField = await this.entityFieldRepository.findOne({
      where: { efId },
      relations: ['browserGroup'],
    });

    if (!entityField) {
      throw new Error(`Entity field with ID ${efId} not found`);
    }

    const existingBrowserGroups = new Map<
      BrowserGroupEnum,
      browserGroupEntity
    >();
    if (entityField.browserGroup && entityField.browserGroup.length > 0) {
      for (const bg of entityField.browserGroup) {
        existingBrowserGroups.set(bg.name, bg);
      }
    }
    const browserGroupsToAdd: browserGroupEntity[] = [];
    for (const groupName of browserGroup) {
      if (!existingBrowserGroups.has(groupName)) {
        const newBrowserGroup = new browserGroupEntity();
        newBrowserGroup.name = groupName;
        newBrowserGroup.entityField = entityField;
        browserGroupsToAdd.push(newBrowserGroup);
      }
      existingBrowserGroups.delete(groupName);
    }
    if (browserGroupsToAdd.length > 0) {
      await this.browserGroupRepository.save(browserGroupsToAdd);
    }

    if (existingBrowserGroups.size > 0) {
      const browserGroupsToRemove = Array.from(existingBrowserGroups.values());
      await this.browserGroupRepository.remove(browserGroupsToRemove);
    }
    return this.entityFieldRepository.findOne({
      where: { efId },
      relations: ['browserGroup'],
    });
  }
  async modifyMany(
    UpdateMultipleEntityFieldDto: UpdateMultipleEntityFieldDto
  ): Promise<EntityField[]> {
    return await Promise.all(
      UpdateMultipleEntityFieldDto.data.map(
        async (updateEntityFieldDto: UpdateEntityFieldDto) => {
          return await this.modify(updateEntityFieldDto);
        }
      )
    );
  }

  async remove(entityFieldIdDto: EntityFieldIdDto): Promise<EntityField> {
    const { efId } = entityFieldIdDto;
    await this.browserGroupRepository.delete({ efId });
    const entityField = await this.entityFieldRepository.findOne({
      where: { efId },
    });
    if (!entityField) throw new Error(`Entity field with ID ${efId} not found`);
    await this.entityFieldRepository.remove(entityField);
    return entityField;
  }
  async removeMany(
    getEntityFieldByIdArrayDto: GetEntityFieldByIdArrayDto
  ): Promise<EntityField[]> {
    return await Promise.all(
      getEntityFieldByIdArrayDto.data.map(
        async (entityFieldIdDto: EntityFieldIdDto) => {
          return await this.remove(entityFieldIdDto);
        }
      )
    );
  }
  private buildSearchQuery(
    filters: ReadEntityFieldDto
  ): SelectQueryBuilder<EntityField> {
    const query = this.entityFieldRepository.createQueryBuilder('entityField');
    if (filters.efId !== undefined) {
      query.andWhere('entityField.efId = :efId', { efId: filters.efId });
    }

    if (filters.etId !== undefined) {
      query.andWhere('entityField.etId = :etId', { etId: filters.etId });
    }

    if (filters.fieldTag !== undefined) {
      query.andWhere('entityField.fieldTag = :fieldTag', {
        fieldTag: filters.fieldTag,
      });
    }

    if (filters.fieldTagLike !== undefined) {
      query.andWhere('entityField.fieldTag LIKE :fieldTagLike', {
        fieldTagLike: `%${filters.fieldTagLike}%`,
      });
    }
    if (filters.fieldTagLike !== undefined) {
      query.andWhere('entityField.fieldTag LIKE :fieldTagLike', {
        fieldTagLike: `%${filters.fieldTagLike}%`,
      });
    }

    if (filters.isStatic !== undefined) {
      query.andWhere('entityField.isStatic = :isStatic', {
        isStatic: filters.isStatic,
      });
    }

    if (filters.isComputational !== undefined) {
      query.andWhere('entityField.isComputational = :isComputational', {
        isComputational: filters.isComputational,
      });
    }
    if (filters.browserGroups && filters.browserGroups.length > 0) {
      this.applyBrowserGroupFilters(query, filters.browserGroups);
    }

    return query;
  }

  private applyBrowserGroupFilters(
    query: SelectQueryBuilder<EntityField>,
    browserGroups: BrowserGroupEnum[]
  ): void {
    browserGroups.forEach((group, index) => {
      const alias = `bg${index}`;
      query
        .andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select('1')
            .from(browserGroupEntity, alias)
            .where(`${alias}.efId = entityField.efId`)
            .andWhere(`${alias}.name = :browserGroup${index}`);

          return `EXISTS ${subQuery.getQuery()}`;
        })
        .setParameter(`browserGroup${index}`, group);
    });
  }
  async getBrowserGroupOptions(): Promise<BrowserGroupEnum[]> {
    const browserGroups = await this.browserGroupRepository
      .createQueryBuilder('bg')
      .select('DISTINCT bg.name', 'name')
      .getRawMany();

    return browserGroups.map((group) => group.name);
  }
}
