import { IsNumber } from 'class-validator';
import { CreateEntityTypeDto } from './create-entity-type.dto';

export class UpdateEntityTypeDto extends CreateEntityTypeDto {
        @IsNumber()
        et_id: number;
}
