import { Type } from 'class-transformer';
import { EntityIdDto } from '../generals/entity-id.dto';
import { EntityFieldIdDto } from '../generals/entity-field-id.dto';

export class GetEntityFieldArrayByIdDto {
  @Type(() => EntityFieldIdDto)
  data: EntityFieldIdDto[];
}
