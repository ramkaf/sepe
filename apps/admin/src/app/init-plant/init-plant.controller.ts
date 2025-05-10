import { Controller } from '@nestjs/common';
import { InitPlantService } from './init-plant.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { INITIATE_PLANT, InitPlantTagDto } from '@sephrmicroservice-monorepo/common';

@Controller()
export class InitPlantMicroserviceContrller {
  constructor(private readonly initPlantService: InitPlantService) {}

    @MessagePattern(INITIATE_PLANT)
    async initPlantTag(
      @Payload() initplantTagDto: InitPlantTagDto
    ) {
      return await this.initPlantService.initPlantTag(initplantTagDto);
    }
}
