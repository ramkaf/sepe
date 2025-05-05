import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class EntityFieldIdDto {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  efId: number;
}
