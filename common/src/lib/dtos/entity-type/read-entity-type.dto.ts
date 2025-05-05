import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReadEntityTypeDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  etId?: number;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  plantId?: number;
}
