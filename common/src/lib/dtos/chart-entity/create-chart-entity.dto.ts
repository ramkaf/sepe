import { Type } from 'class-transformer';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateChartEntityDto {
  @IsInt()
  @IsPositive()
  e_id: number;

  @Type(() => Number)
  @IsNumber()
  detail_id: number;

  @IsOptional()
  @IsString()
  chart_entity_title: string;
}
