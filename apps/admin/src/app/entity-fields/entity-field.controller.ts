import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EntityFieldService } from './entity-field.service';

@Controller()
export class EntityFieldMicroserviceController {
  constructor(private readonly entityFieldService: EntityFieldService) {}
}
