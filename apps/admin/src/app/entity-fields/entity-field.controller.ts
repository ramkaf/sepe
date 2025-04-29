import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntityFieldService } from './entity-field.service';

@Controller()
export class EntityFieldController {
  constructor(
    private readonly entityFieldService: EntityFieldService,
  ) {}

  @MessagePattern('entity-field:create')
  handleOrderCreated(@Payload() order:any){
    console.log(`order service recieved new message` , order);
  }
}
