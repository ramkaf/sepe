import { Type } from "class-transformer";
import { GetByIdEntityTypeDto } from "./getbyid-entity-type.dto";

export class IdArrayDto {
    @Type(() => GetByIdEntityTypeDto)
    data: GetByIdEntityTypeDto[];
  }