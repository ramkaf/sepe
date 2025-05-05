import { IsString, IsNumber, IsInt } from 'class-validator';

export class CreateEntityDto {
  @IsString()
  entity_name: string;

  @IsString()
  entity_tag: string;

  @IsNumber()
  @IsInt()
  parent_in_tree_id: number;

  @IsNumber()
  etId: number;
}
