import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ElasticService,
  EntityField,
  EntityModel,
  EntityType,
  InitPlantTagDto,
  PlantTagDto,
} from '@sephrmicroservice-monorepo/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RevertInitPlantService {
  constructor(
    @InjectRepository(EntityModel)
    private readonly entityRepository: Repository<EntityModel>,
    @InjectRepository(EntityType)
    private readonly entityTypeRepository: Repository<EntityType>,
    @InjectRepository(EntityField)
    private readonly entityFieldRepository: Repository<EntityField>,
    @Inject('DATA_SOURCE') private readonly dataSource: DataSource
  ) {}

  async revertPlantTagAndEntityAndTypeAndFields(
    plantTagDto: PlantTagDto
  ): Promise<Boolean> {
    const { plantTag: tag } = plantTagDto;
    const entity = await this.entityRepository.findOne({
      where: { entityTag: tag },
    });
    if (!entity) {
      throw new Error(`${tag} plant not found`);
    }

    this.dataSource.transaction(async (manager) => {
      const entityTypeRepo = manager.getRepository(EntityType);
      const entityFieldRepo = manager.getRepository(EntityField);
      const entityRepo = manager.getRepository(EntityModel);

      await entityFieldRepo.delete({ etId: entity.etId });
      await entityRepo.delete({ etId: entity.etId });
      await entityTypeRepo.delete({ plantId: entity.eId });
    });
    return true;
  }
}
