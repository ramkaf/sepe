import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class ChartIdDto {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  chartId: number;
}
