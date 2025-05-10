import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { GroupTypeEnum } from '../../enums';

export class CreateChartDetailDto {
  @IsString()
  detailTitle: string;

  @IsString()
  detailDes: string;

  @IsEnum(GroupTypeEnum)
  groupType: GroupTypeEnum;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  chartId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  etId: number;
}
