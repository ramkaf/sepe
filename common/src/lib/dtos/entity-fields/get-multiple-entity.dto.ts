import { Type } from 'class-transformer';
import { EntityIdDto } from '../generals/entity-id.dto';
import { EntityFieldIdDto } from '../generals/entity-field-id.dto';
import { IsArray, ValidateNested } from 'class-validator';

export class GetEntityFieldByIdArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntityFieldIdDto)
  data: EntityFieldIdDto[];
}
