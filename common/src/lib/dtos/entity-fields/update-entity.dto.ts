import { CreateEntityFieldDto } from './create-entity-fields.dto';
import { IntersectionType } from '@nestjs/mapped-types';
import { EntityFieldIdDto } from '../generals/entity-field-id.dto';

export class UpdateEntityFieldDto extends IntersectionType(
  EntityFieldIdDto,
  CreateEntityFieldDto
) {}
