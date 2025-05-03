import { IsIn, IsInt, IsNumber, IsString } from "class-validator";
import { CreateEntityFieldDto } from "./create-entity-fields.dto";

export class UpdateEntityFieldDto extends CreateEntityFieldDto {
    @IsNumber()
    ef_id: number;
}
