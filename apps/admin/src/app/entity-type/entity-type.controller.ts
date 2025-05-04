import { Controller, Get, Inject } from '@nestjs/common';
import { EntityTypeService } from './entity-type.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateEntityArrayDto, CreateEntityTypeArrayDto, ENTITY_TYPE_MULTIPLE_CREATED } from '@sephrmicroservice-monorepo/common';

@Controller()
export class EntityTypeMicroserviceController {
    constructor (private readonly entityTypeService:EntityTypeService){}

    @MessagePattern(ENTITY_TYPE_MULTIPLE_CREATED)
    async createMany(@Payload() createEntityTypeArrayDto:CreateEntityTypeArrayDto){
        return await this.entityTypeService.createMany(createEntityTypeArrayDto)
    }
}
