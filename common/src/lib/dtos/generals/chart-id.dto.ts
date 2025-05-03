import { IsInt, IsPositive } from 'class-validator';

export class ChartIdDto {
  @IsInt()
  @IsPositive()
  chartId: number;
}
