import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
// import { toTitleCase } from '../../utils';

export class InitPlantTagDto {
  @IsString()
  tag: string;

  @IsOptional()
  @IsString()
  entityTypeDescription?: string;

  @IsOptional()
  @IsString()
  entityName?: string;
}
