import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { BrowserGroupEnum } from 'common/src/lib/enums';

export class ReadEntityFieldDto {
  @IsOptional()
  @IsNumber()
  efId?: number;

  @IsOptional()
  @IsNumber()
  etId?: number;

  @IsOptional()
  @IsString()
  fieldTag?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isStatic?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isComputational?: boolean;

  @IsOptional()
  @IsString()
  fieldTagLike?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(BrowserGroupEnum, { each: true })
  browserGroups?: BrowserGroupEnum[];
}
