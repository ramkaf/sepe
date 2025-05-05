import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReadEntityFieldDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  efId?: number;

  @IsOptional()
  @IsString()
  fieldTag?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  etId?: number;
}
