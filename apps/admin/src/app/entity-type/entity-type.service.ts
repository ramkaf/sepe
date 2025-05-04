import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEntityTypeArrayDto, CreateEntityTypeDto, EntityType } from '@sephrmicroservice-monorepo/common';
import { Repository } from 'typeorm';

@Injectable()
export class EntityTypeService {
   constructor( @InjectRepository(EntityType)
   private readonly entityTypeRepository: Repository<EntityType>){
    
   }

   async create(createEntityTypeDto: CreateEntityTypeDto): Promise<EntityType> {
    const {name , tag , abstractionLevel , description , plantId } = createEntityTypeDto
    const entityType = this.entityTypeRepository.create({
        name,
        tag,
        abstractionLevel,
        description,
        plantId
    });
    return await this.entityTypeRepository.save(entityType);
  }
  
  async createMany(createEntityTypeArrayDto: CreateEntityTypeArrayDto): Promise<EntityType[]> {
    return await Promise.all(
      createEntityTypeArrayDto.data.map(async (createEntityTypeDto: CreateEntityTypeDto) => {
        return await this.create(createEntityTypeDto);
      })
    );
  }
}
