import {
  IsArray,
  IsBoolean,
  isEnum,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { BrowserGroupEnum, EntityFieldTypeEnum } from 'common/src/lib/enums';
import { UnitEnum } from '../../enums/entities/unit.interface';

export class CreateEntityFieldDto {
  @IsString()
  fieldTitle: any;

  @IsString()
  @Matches(/^\S*$/, { message: 'field_tag must not contain spaces' })
  fieldTag: string;

  @IsNumber()
  etId: number;

  @IsOptional()
  @IsEnum(UnitEnum)
  unit: UnitEnum;

  @IsBoolean()
  isComputational: boolean;

  @IsOptional()
  lastValueFunctionName: string;

  @IsOptional()
  allValuesFunctionName: string;

  @IsArray()
  @IsEnum(BrowserGroupEnum, { each: true })
  browserGroup: BrowserGroupEnum[];

  @IsBoolean()
  isStatic: boolean;

  @IsOptional()
  staticValue: string;

  @IsOptional()
  maskFunction: string;

  @IsEnum(EntityFieldTypeEnum)
  fieldType: EntityFieldTypeEnum;
}
