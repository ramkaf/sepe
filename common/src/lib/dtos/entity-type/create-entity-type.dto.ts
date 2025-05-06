import { IsString, IsNumber, IsEnum } from 'class-validator';
import { AbstractionLevel } from 'common/src/lib/enums';

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
