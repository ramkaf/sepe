import { Type } from 'class-transformer';
import { UpdateEntityDto } from './update-entity.dto';

export class UpdateMultipleEntityArrayDto {
  @Type(() => UpdateEntityDto)
  data: UpdateEntityDto[];
}
