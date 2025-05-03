
import { IsInt, IsPositive } from 'class-validator';

export class EntityTypeIdDto {
  @IsInt()
  @IsPositive()
  etId: number;
}