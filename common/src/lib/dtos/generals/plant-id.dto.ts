import { IsInt, IsPositive } from 'class-validator';

export class PlantIdDto {
  @IsInt()
  @IsPositive()
  plantId: number;
}
