import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ChartIdDto } from '../generals/chart-id.dto';

export class GetMultipleChartByIdDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChartIdDto)
  data: ChartIdDto[];
}
