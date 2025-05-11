import { ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEntityTypeDto } from './create-entity-type.dto';

export class CreateMultipleEntityTypeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEntityTypeDto)
  data: CreateEntityTypeDto[];
}
