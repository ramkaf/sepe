import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailFieldDto } from './create-detail-field.dto';

export class UpdateDetailFieldDto extends PartialType(CreateDetailFieldDto) {}
