import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class ChartEntityIdDto {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  cheId: number;
}
