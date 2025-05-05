import { IsString, IsNumber, IsEnum } from 'class-validator';
import { AbstractionLevel } from '../../database/postgresql/interfaces/entities/abstract-level.interface';

export class CreateEntityTypeDto {
  @IsString()
  name: string;

  @IsString()
  tag: string;

  @IsString()
  description: string;

  @IsEnum(AbstractionLevel)
  abstractionLevel: AbstractionLevel;

  @IsNumber()
  plantId: number;
}
