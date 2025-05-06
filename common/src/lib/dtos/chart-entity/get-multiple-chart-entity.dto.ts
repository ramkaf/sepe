import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ChartEntityIdDto } from '../generals/chart-entity-id.dto';

export class GetChartEntityByIdArrayDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChartEntityIdDto)
  data: ChartEntityIdDto[];
}
