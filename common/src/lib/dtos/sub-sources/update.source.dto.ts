import { IsIn, IsInt, IsNumber } from 'class-validator';
import { CreateSourceDto } from './create-source.dto';

export class updateSourceDto extends CreateSourceDto {
  @IsNumber()
  @IsInt()
  id: number;
}
