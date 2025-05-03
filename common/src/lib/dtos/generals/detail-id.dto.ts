
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ChartDetailIdDto {
    @Type(() => Number)
    @IsNumber()
    detailId: number;
}