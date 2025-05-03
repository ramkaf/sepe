import { CreateChartDetailDto } from './create-chart-detail.dto';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UpdateChartDetailDto extends CreateChartDetailDto {
  @Type(() => Number)
  @IsNumber()
  detail_id: number;
}
