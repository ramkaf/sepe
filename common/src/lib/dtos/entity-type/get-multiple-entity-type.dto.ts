import { Type } from 'class-transformer';
import { EntityTypeIdDto } from '../generals/entity-type-id.dto';

export class GetEntityTypeByIdArrayDto {
  @Type(() => EntityTypeIdDto)
  data: EntityTypeIdDto[];
}
