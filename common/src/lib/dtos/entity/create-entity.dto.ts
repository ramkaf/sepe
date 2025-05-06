import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateEntityDto {
  @IsString()
  entityName: string;

  @IsString()
  entityTag: string;

  @IsNumber()
  @IsInt()
  parentInTreeId: number;

  @IsNumber()
  etId: number;
}
