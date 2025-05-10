import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    AbstractionLevel,
  EntityField,
  EntityModel,
  EntityType,
  InitPlantTagDto,
  PlantTagDto,
  toTitleCase,
} from '@sephrmicroservice-monorepo/common';
import { Repository } from 'typeorm';

@Injectable()
export class InitPlantService {
  constructor(
    @InjectRepository(EntityModel)
    private readonly entityRepository: Repository<EntityModel>,
    @InjectRepository(EntityType)
    private readonly entityTypeRepository: Repository<EntityType>,
    @InjectRepository(EntityField)
    private readonly entityFieldRepository: Repository<EntityField>
  ) {}

  async initPlantTag(initPlantTagDto: InitPlantTagDto) {
    const { tag, entityTypeDescription, entityName } = initPlantTagDto;
    const description = entityTypeDescription ? entityTypeDescription : `${toTitleCase(tag)} power plant .`;
    const entityName_ = entityName ? entityName : toTitleCase(tag);
    
    const entityType_ = await this.entityTypeRepository.findOne({
      where: { tag },
    }); 
    if (entityType_)
      throw new ConflictException('plant tag entity Type is already Taken');

    const entity_ = await this.entityRepository.findOne({
        where: { entityTag: tag },
      });
      if (entity_)
        throw new ConflictException('plant tag entity is already Taken');

    const entityTypeSchema = this.entityTypeRepository.create({
      name: toTitleCase(tag),
      tag,
      description,
      abstractionLevel : AbstractionLevel.SECTION
    });
    const entityType = await this.entityTypeRepository.save(entityTypeSchema)

    const entitySchema = this.entityRepository.create({
      entityName:entityName_,
      entityTag: tag,
      parentInTreeId: 0,
      entityType,
    });
    const entity = await this.entityRepository.save(entitySchema);    
    await this.entityTypeRepository.update(entityType.etId, {
      plantId: entity.eId,
    });
    const plant = await this.entityRepository.findOne({
        where : {eId : entity.eId},
        relations : ['entityType']
    })
    return plant
  }
}
