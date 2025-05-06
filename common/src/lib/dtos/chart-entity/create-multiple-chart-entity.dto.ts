import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateEntityDto } from '../entity/create-entity.dto';
import { CreateChartEntityDto } from './create-chart-entity.dto';

export class CreateMultipleChartEntityDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChartEntityDto)
  data: CreateChartEntityDto[];
}
