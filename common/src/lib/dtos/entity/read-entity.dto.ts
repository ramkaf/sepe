import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReadEntityDto {
  @IsOptional()
  @IsString()
  entityName?: string;

  @IsOptional()
  @IsString()
  entityTag?: string;

  @IsOptional()
  @IsString()
  entityTagLike?: string;

  @IsOptional()
  @IsInt()
  parentInTreeId: number;

  @IsOptional()
  @IsNumber()
  etId?: number;
}
