import { IsNumber } from "class-validator";
import { CreateEntityDto } from "./create-entity.dto";

export class UpdateEntityDto extends CreateEntityDto {
    @IsNumber()
    e_id: number;
}
