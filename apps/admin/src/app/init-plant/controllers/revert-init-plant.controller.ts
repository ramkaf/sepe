import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  PlantTagDto,
  REVERT_INITIATE_PLANT_DEVICE,
  REVERT_INITIATE_PLANT_TAG,
} from '@sephrmicroservice-monorepo/common';
import { RevertInitPlantService } from '../providers/revert-init-plant.service';

@Controller()
export class RevertInitPlantMicroserviceContrller {
  constructor(
    private readonly revertInitPlantService: RevertInitPlantService
  ) {}

  @MessagePattern(REVERT_INITIATE_PLANT_DEVICE)
  async revertPlantEntityWithTypeAndFields(
    @Payload() PlantTagDto: PlantTagDto
  ) {
    return this.revertInitPlantService.revertPlantTagAndEntityAndTypeAndFields(
      PlantTagDto
    );
  }
}
