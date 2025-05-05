import { IsNumber } from 'class-validator';
import { CreateEntityTypeDto } from './create-entity-type.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { EntityTypeIdDto } from '../generals/entity-type-id.dto';

export class UpdateEntityTypeDto extends IntersectionType(CreateEntityTypeDto , EntityTypeIdDto)  {
  
}
