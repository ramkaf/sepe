import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { TimeGroupTypeEnum } from '../../enums';

export class CreateChartDto {
  @IsInt()
  @Type(() => Number)
  plantId: number;

  @IsString()
  chartTitle: string;

  @IsString()
  chartDes: string;

  @IsInt()
  @Type(() => Number)
  timeGroup: number;

  @IsEnum(TimeGroupTypeEnum)
  timeGroupType: TimeGroupTypeEnum;
}
