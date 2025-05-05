import { Type } from 'class-transformer';
import { EntityTypeIdDto } from '../generals/entity-type-id.dto';
import { IsArray, ValidateNested } from 'class-validator';

export class GetEntityTypeByIdArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntityTypeIdDto)
  data: EntityTypeIdDto[];
}
