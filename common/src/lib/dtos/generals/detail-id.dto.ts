import { Transform, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ChartDetailIdDto {
  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  detailId: number;
}
