import { IntersectionType } from '@nestjs/mapped-types';
import { CreateDetailFieldDto } from './create-detail-field.dto';
import { DetailFieldIdDto } from '../generals/detail-field-id.dto';

export class UpdateDetailFieldDto extends IntersectionType(
  CreateDetailFieldDto , DetailFieldIdDto
){}