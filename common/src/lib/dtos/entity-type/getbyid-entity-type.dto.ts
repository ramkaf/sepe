import { IsNumber } from "class-validator";

export class GetByIdEntityTypeDto {
    @IsNumber()
    id: number;
  }