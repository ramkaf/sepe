import { PartialType } from '@nestjs/mapped-types';
import { CreateChartDetailDto } from './create-chart-detail.dto';

export class UpdateChartDetailDto extends PartialType(CreateChartDetailDto) {}
