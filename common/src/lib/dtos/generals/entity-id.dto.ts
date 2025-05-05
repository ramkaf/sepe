import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class EntityIdDto {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  eId: number;
}
