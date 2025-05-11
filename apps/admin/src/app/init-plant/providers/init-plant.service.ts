import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AbstractionLevel,
  ElasticService,
  EntityField,
  EntityModel,
  EntityType,
  IEntityTypeWithParameters,
  InitPlantTagDto,
  ISourceWithDevices,
  PlantTagDto,
  toTitleCase,
} from '@sephrmicroservice-monorepo/common';
import { DataSource, Repository } from 'typeorm';
import { SourceService } from './source.service';

@Injectable()
export class InitPlantService {
  constructor(
    @InjectRepository(EntityModel)
    private readonly entityRepository: Repository<EntityModel>,
    @InjectRepository(EntityType)
    private readonly entityTypeRepository: Repository<EntityType>,
    @InjectRepository(EntityField)
    private readonly elasticSearchService: ElasticService,
    private readonly sourceService: SourceService,
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource
  ) {}

  async initPlantTag(initPlantTagDto: InitPlantTagDto): Promise<EntityModel> {
    const { tag, entityName } = initPlantTagDto;
    const description: string = tag;
    const entityName_ = entityName ? entityName : toTitleCase(tag);

    const existingEntityType = await this.entityTypeRepository.findOne({
      where: { description: tag },
    });
    if (existingEntityType) {
      throw new ConflictException(`${tag} entity Type is already Taken`);
    }

    const existingEntity = await this.entityRepository.findOne({
      where: { entityTag: tag },
    });
    if (existingEntity) {
      throw new ConflictException(`${tag} entity is already Taken`);
    }

    return this.dataSource.transaction(async (manager) => {
      const entityTypeRepo = manager.getRepository(EntityType);
      const entityRepo = manager.getRepository(EntityModel);

      const entityType = entityTypeRepo.create({
        name: 'Plant',
        tag: 'Plant',
        description,
        abstractionLevel: AbstractionLevel.SECTION,
      });
      const savedEntityType = await entityTypeRepo.save(entityType);

      const entity = entityRepo.create({
        entityName: entityName_,
        entityTag: tag,
        parentInTreeId: 0,
        entityType: savedEntityType,
      });
      const savedEntity = await entityRepo.save(entity);

      await entityTypeRepo.update(savedEntityType.etId, {
        plantId: savedEntity.eId,
      });

      const plant = await entityRepo.findOne({
        where: { eId: savedEntity.eId },
        relations: ['entityType'],
      });

      return plant;
    });
  }

  async getDevicesWithSources(
    plantTagDto: PlantTagDto
  ): Promise<ISourceWithDevices[]> {
    const { plantTag } = plantTagDto;
    const result = await this.elasticSearchService.getPlantDevices(plantTag);
    const plant = await this.entityRepository.findOne({
      where: { entityTag: plantTag },
    });
    const sources = await this.sourceService.read({ plantId: plant.eId });
    return result.aggregations.by_sub.buckets.map((item: any) => {
      const key = item.key;
      const source = sources.find((obj) => obj.key === key);
      const devices = item.unique_device_names.buckets.map((device) => {
        return device.key;
      });
      return {
        sourceName: source.sourceName,
        devices,
      };
    });
  }

  async getParametersOfEntityTypes(
    PlantTagDto: PlantTagDto
  ): Promise<IEntityTypeWithParameters[]> {
    const { plantTag } = PlantTagDto;
    const entity = await this.entityRepository.findOne({
      where: {
        entityTag: plantTag,
      },
    });
    const entityTypes: EntityType[] = await this.entityTypeRepository.find({
      where: {
        plantId: entity.eId,
      },
    });
    if (!entity) throw new NotFoundException(`${plantTag} Plant not found`);

    const entityTypeWithParameters = [];
    for (const entityType of entityTypes) {
      const result = await this.elasticSearchService.getPlantParameters(
        plantTag,
        entityType.tag
      );
      const parametersJsonObject = result.hits.hits[0]?._source;
      if (parametersJsonObject) {
        const paramters = Object.keys(parametersJsonObject);
        entityTypeWithParameters.push({
          entityType,
          paramters,
        });
      }
    }
    return entityTypeWithParameters;
  }
}
