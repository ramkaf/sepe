import { IsNumber } from "class-validator";

export class GetByIdChartDetailsDto {
    @IsNumber()
    detail_id: number;
  }