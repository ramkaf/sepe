import { Type } from "class-transformer";
import { ChartEntityIdDto } from "../generals/chart-entity-id.dto";

export class GetChartEntityByIdArrayDto {
    @Type(() => ChartEntityIdDto)
    data: ChartEntityIdDto[];
  }