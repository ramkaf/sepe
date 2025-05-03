import { Type } from "class-transformer";
import { CreateChartEntityDto } from "./create-chart-entity.dto";


export class GetByIdEntityArrayDto {
    @Type(() => CreateChartEntityDto)
    data: CreateChartEntityDto[];
  }