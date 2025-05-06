import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { CreateChartDto } from './create-chart.dto';
import { ChartIdDto } from '../generals/chart-id.dto';

export class UpdateChartDto extends IntersectionType(
  ChartIdDto,
  CreateChartDto
) {}
