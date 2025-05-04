import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, ClientRMQ } from '@nestjs/microservices';
import { ADMIN_RABBITMQ_SERVICE, ENTITY_TYPE_MULTIPLE_CREATED, EntityType } from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('admin/entity-type')
export class EntityTypeController {
    constructor (
        @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
    ){}

    @Post()
    async createManyEntityType(@Body() data:any){
        const result = this.rabbitClient.send(ENTITY_TYPE_MULTIPLE_CREATED, data);
        return firstValueFrom(result)
    }
}
