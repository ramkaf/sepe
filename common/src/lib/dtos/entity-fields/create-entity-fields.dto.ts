import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { BrowserGroupEnum, EntityFieldTypeEnum } from '../../database';

export class CreateEntityFieldDto {
  @IsString()
  fieldTitle: any;

  @IsString()
  @Matches(/^\S*$/, { message: 'field_tag must not contain spaces' })
  fieldTag: string;

  @IsNumber()
  etId: number;

  @IsOptional()
  @IsString()
  unit: string;

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
