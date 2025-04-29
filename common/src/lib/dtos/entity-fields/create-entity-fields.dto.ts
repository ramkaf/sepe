import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class EntityFieldCreateDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  field_title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  field_tag: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  unit?: string | null;

  @IsBoolean()
  is_computational: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  last_value_function_name?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  all_values_function_name?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  browser_group?: string | null;

  @IsBoolean()
  is_static: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  static_value?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  mask_function?: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  field_type?: string = 'value'; // default to 'value'

  @IsOptional()
  @IsString()
  @MaxLength(255)
  default_cache_value?: string | null;

  @Type(() => Number)
  @IsInt()
  entity_type_id: number;
}
