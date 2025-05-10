import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ADMIN_RABBITMQ_SERVICE,
  INITIATE_PLANT,
  InitPlantTagDto,
  PlantTagDto,
} from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('admin/init-plant')
export class PlantInitController {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  @Post('/plant-tag')
  async initPlantTag(@Body() initPlantTagDto: InitPlantTagDto) {
    const result = this.rabbitClient.send(INITIATE_PLANT, initPlantTagDto);
    return firstValueFrom(result);
  }
}
