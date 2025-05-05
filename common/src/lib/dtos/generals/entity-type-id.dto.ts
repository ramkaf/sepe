import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class EntityTypeIdDto {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  etId: number;
}
