import { Type } from "class-transformer";
import { UpdateEntityFieldDto } from "./update-entity.dto";

export class UpdateMultipleEntityFieldArrayDto {
    @Type(() => UpdateEntityFieldDto)
    data: UpdateEntityFieldDto[];
  }