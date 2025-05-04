import { Controller } from '@nestjs/common';
import { EntityService } from './entity.service';

@Controller('admin/entity')
export class EntityMicroserviceController {
  constructor(private readonly entityService: EntityService) {}
}
