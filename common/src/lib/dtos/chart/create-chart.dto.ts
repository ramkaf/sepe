import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateChartDto {
  @Type(() => Number)
  @IsNumber()
  plantId: number;

  @IsString()
  chart_title: string;

  @IsString()
  chart_des: string;

  @Type(() => Number)
  @IsNumber()
  time_group: number;

  @IsString()
  time_group_type: string;
}
