import { ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEntityFieldDto } from './create-entity-fields.dto';

export class CreateMultipleEntityFieldDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEntityFieldDto)
  data: CreateEntityFieldDto[];
}
