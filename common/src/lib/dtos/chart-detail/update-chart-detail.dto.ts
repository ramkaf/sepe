import { IntersectionType } from '@nestjs/mapped-types';
import { CreateChartDetailDto } from './create-chart-detail.dto';
import { ChartDetailIdDto } from '../generals/detail-id.dto';

export class UpdateChartDetailDto extends IntersectionType(
  CreateChartDetailDto,
  ChartDetailIdDto
) {}
