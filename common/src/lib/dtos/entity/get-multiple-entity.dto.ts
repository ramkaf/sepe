import { Type } from "class-transformer";
import { EntityIdDto } from "../generals/entity-id.dto";

export class GetByIdEntityArrayDto {
    @Type(() => EntityIdDto)
    data: EntityIdDto[];
  }