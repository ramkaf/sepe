import { IsEnum, IsInt } from 'class-validator';
import { ChartTypeEnum, OperationTypeEnum } from '../../enums';
import { UnitEnum } from '../../enums/entities/unit.interface';

export class CreateDetailFieldDto {
  @IsInt()
  detailId: number;

  @IsInt()
  fieldId: number;

  @IsEnum(UnitEnum)
  unit: UnitEnum;

  @IsInt()
  devideBy?: number = 1;

  @IsEnum(OperationTypeEnum)
  oprType?: OperationTypeEnum;

  @IsEnum(ChartTypeEnum)
  chartType: ChartTypeEnum;
}
