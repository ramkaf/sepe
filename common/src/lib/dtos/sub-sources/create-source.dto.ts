import { IsString, IsNumber, IsEnum, IsIn, IsInt } from 'class-validator';
import { SourceKeyDto } from '../generals/source-key.dto';

export class CreateSourceDto extends SourceKeyDto {
  @IsNumber()
  @IsInt()
  plantId: number;

  @IsString()
  sourceName: string;
}
