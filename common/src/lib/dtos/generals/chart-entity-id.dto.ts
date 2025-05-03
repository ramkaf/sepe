import { IsInt, IsPositive } from 'class-validator';

export class ChartEntityIdDto {
  @IsInt()
  @IsPositive()
  cheId: number;
}
