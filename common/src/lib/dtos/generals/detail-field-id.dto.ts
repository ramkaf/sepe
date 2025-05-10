import { Transform, Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DetailFieldIdDto {
  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  dfId: number;
}
