import { PartialType } from '@nestjs/mapped-types';
import { CreateChartDto } from './create-chart.dto';
import { IsIn, IsInt, IsNumber } from 'class-validator';

export class UpdateChartDto extends CreateChartDto {
  @IsNumber()
  @IsInt()
  chartId: number;
}
