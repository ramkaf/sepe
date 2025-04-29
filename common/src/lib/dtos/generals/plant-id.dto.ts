// src/common/dto/plant-id.dto.ts

import { IsInt, IsPositive } from 'class-validator';

export class PlantIdDto {
  @IsInt()
  @IsPositive()
  plant_id: number;
}