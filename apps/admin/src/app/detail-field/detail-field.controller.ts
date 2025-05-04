import { Controller } from '@nestjs/common';
import { DetailFieldService } from './detail-field.service';

@Controller('detail-field')
export class DetailFieldMicroserviceController {
  constructor(private readonly detailFieldService: DetailFieldService) {}
}
