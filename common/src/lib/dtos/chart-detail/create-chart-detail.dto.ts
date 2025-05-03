import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateChartDetailDto {
  @IsString()
  detail_title: string;

  @IsString()
  detail_des: string;

  @IsString()
  group_type: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  chart_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  entity_type_id?: number;
}
