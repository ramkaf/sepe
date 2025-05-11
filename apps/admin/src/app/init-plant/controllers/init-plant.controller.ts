import { Controller } from '@nestjs/common';
import { InitPlantService } from '../providers/init-plant.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  INITIATE_PLANT_DEVICE,
  INITIATE_PLANT_PARAMETERS,
  INITIATE_PLANT_TAG,
  InitPlantTagDto,
  PlantTagDto,
} from '@sephrmicroservice-monorepo/common';

@Controller()
export class InitPlantMicroserviceContrller {
  constructor(private readonly initPlantService: InitPlantService) {}

  @MessagePattern(INITIATE_PLANT_TAG)
  async initPlantTag(@Payload() initplantTagDto: InitPlantTagDto) {
    return await this.initPlantService.initPlantTag(initplantTagDto);
  }

  @MessagePattern(INITIATE_PLANT_DEVICE)
  async getDevicesWithSources(@Payload() PlantTagDto: PlantTagDto) {
    return await this.initPlantService.getDevicesWithSources(PlantTagDto);
  }

  @MessagePattern(INITIATE_PLANT_PARAMETERS)
  async getDeviceWithParameters(@Payload() PlantTagDto: PlantTagDto) {
    return await this.initPlantService.getParametersOfEntityTypes(PlantTagDto);
  }
}
