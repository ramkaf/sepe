import { ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEntityDto } from './create-entity.dto';

export class CreateEntityArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEntityDto)
  data: CreateEntityDto[];
}
