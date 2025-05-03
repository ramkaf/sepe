import { Type } from "class-transformer";
import { UpdateEntityTypeDto } from "./update-entity-type.dto";

export class UpdateMultipleEntityTypeDto {
    @Type(() => UpdateEntityTypeDto)
    data: UpdateEntityTypeDto[];
  }