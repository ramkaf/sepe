import { Type } from 'class-transformer';
import { UpdateEntityDto } from './update-entity.dto';
import { IsArray, ValidateNested } from 'class-validator';

export class UpdateMultipleEntityDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateEntityDto)
  data: UpdateEntityDto[];
}
