import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateEntityTypeDto {
  @IsString()
  name: string;

  @IsString()
  tag: string;

  @IsString()
  description: string;

  @IsString()
  abstraction_level: string;

  @IsNumber()
  plantId: number;
}
