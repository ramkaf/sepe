import { CreateEntityDto } from './create-entity.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { EntityIdDto } from '../generals/entity-id.dto';

export class UpdateEntityDto extends IntersectionType(
  EntityIdDto,
  CreateEntityDto
) {}
