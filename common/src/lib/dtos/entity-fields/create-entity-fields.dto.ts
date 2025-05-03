import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength } from 'class-validator';


export class CreateEntityFieldDto {
  @IsString() 
  field_title: any;

  @IsString()
  @Matches(/^\S*$/, { message: 'field_tag must not contain spaces' })
  field_tag: string;

  @IsNumber()
  entity_type_id: number;

  @IsOptional()
  @IsString()
  unit: string;

  @IsBoolean()
  is_computational: boolean;

  @IsOptional()
  last_value_function_name: string;

  @IsOptional()
  all_values_function_name: string;

  @IsString()
  browser_group: string;

  @IsBoolean()
  is_static: boolean;

  @IsOptional()
  static_value: string;

  @IsOptional()
  mask_function: string;

  @IsOptional()
  field_type: string;
}
