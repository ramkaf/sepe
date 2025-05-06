import { Type } from 'class-transformer';
import { UpdateEntityFieldDto } from './update-entity.dto';
import { IsArray, ValidateNested } from 'class-validator';

export class UpdateMultipleEntityFieldDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateEntityFieldDto)
  data: UpdateEntityFieldDto[];
}
