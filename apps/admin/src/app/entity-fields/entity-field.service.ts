import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ADMIN_RABBITMQ_SERVICE,
  BrowserGroupEnum,
  CreateEntityFieldArrayDto,
  CreateEntityFieldDto,
  EntityField,
  EntityFieldIdDto,
  GetEntityFieldByIdArrayDto,
  UpdateEntityFieldDto,
  UpdateMultipleEntityFieldDto,
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
      bg.efId = entityField;
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

  async modify(updateEntityFieldDto: UpdateEntityFieldDto): Promise<EntityField> {
  const { efId, browserGroup, ...rest } = updateEntityFieldDto;
  const ef = await this.entityFieldRepository.update({ efId }, rest);
  const entityField = await this.entityFieldRepository.findOne({
    where: { efId },
    relations: ['browserGroup'],
  });
  
  if (!entityField) {
    throw new Error(`Entity field with ID ${efId} not found`);
  }

  const existingBrowserGroups = new Map<BrowserGroupEnum, browserGroupEntity>();
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
      newBrowserGroup.efId = entityField;
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

  async remove (entityFieldIdDto:EntityFieldIdDto):Promise<EntityField>{
    const {efId} = entityFieldIdDto
    await this.browserGroupRepository.delete({ efId: { efId } });
    const entityField = await this.entityFieldRepository.findOne({where : {efId}})
    if (!entityField)
      throw new Error(`Entity field with ID ${efId} not found`);
    await this.entityFieldRepository.remove(entityField)
    return entityField
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
}
