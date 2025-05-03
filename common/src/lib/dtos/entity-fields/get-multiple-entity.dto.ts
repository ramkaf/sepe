import { Type } from "class-transformer";
import { EntityIdDto } from "../generals/entity-id.dto";

export class GetByIdEntityFieldArrayDto {
    @Type(() => EntityIdDto)
    data: EntityIdDto[];
  }