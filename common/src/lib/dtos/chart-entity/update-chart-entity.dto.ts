import { PartialType } from '@nestjs/mapped-types';
import { CreateChartEntityDto } from './create-chart-entity.dto';

export class UpdateChartEntityDto extends PartialType(CreateChartEntityDto) {}
