import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class ReadChartDto {
  @IsInt()
  @Type(() => Number)
  plantId: number;
}
