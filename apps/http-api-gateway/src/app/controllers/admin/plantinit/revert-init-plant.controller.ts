import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ADMIN_RABBITMQ_SERVICE,
  INITIATE_PLANT_DEVICE,
  INITIATE_PLANT_TAG,
  InitPlantTagDto,
  PlantTagDto,
  REVERT_INITIATE_PLANT_DEVICE,
  REVERT_INITIATE_PLANT_TAG,
} from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('admin/init-plant/revert')
export class RevertPlantInitController {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  @Post('/plant-tag-entities-types-fields')
  async initPlantTag(@Body() plantTagDto: PlantTagDto) {
    const result = this.rabbitClient.send(
      REVERT_INITIATE_PLANT_DEVICE,
      plantTagDto
    );
    return firstValueFrom(result);
  }
}
