import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ADMIN_RABBITMQ_SERVICE,
  CreateMultipleEntityTypeDto,
  CreateMultipleEntityDto,
  INITIATE_PLANT_DEVICE,
  INITIATE_PLANT_TAG,
  InitPlantTagDto,
  PlantTagDto,
  ENTITY_TYPE_CREATED,
  ENTITY_TYPE_MULTIPLE_CREATED,
  EntityModel,
  ISourceWithDevices,
  EntityType,
  INITIATE_PLANT_PARAMETERS,
  CreateMultipleEntityFieldDto,
  ENTITY_FIELD_MULTIPLE_CREATED,
  ENTITY_MULTIPLE_CREATED,
} from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('admin/init-plant/init')
export class PlantInitController {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  @Post('/plant-tag')
  async initPlantTag(
    @Body() initPlantTagDto: InitPlantTagDto
  ): Promise<EntityModel> {
    const result = this.rabbitClient.send(INITIATE_PLANT_TAG, initPlantTagDto);
    return firstValueFrom(result);
  }

  @Get('/get-source-with-devices/:plantTag')
  async getDevicesWithSources(
    @Param() plantTagDto: PlantTagDto
  ): Promise<ISourceWithDevices> {
    const result = this.rabbitClient.send(INITIATE_PLANT_DEVICE, plantTagDto);
    return firstValueFrom(result);
  }

  @Get('/get-entity-type-with-fields/:plantTag')
  async getEntityTypesWithEntityFields(
    @Param() plantTagDto: PlantTagDto
  ): Promise<any> {
    const result = this.rabbitClient.send(
      INITIATE_PLANT_PARAMETERS,
      plantTagDto
    );
    return firstValueFrom(result);
  }

  @Post('/insert-all-entity-types')
  async insertAllEntityTypes(
    @Body() createMultipleEntityTypeDto: CreateMultipleEntityTypeDto
  ): Promise<EntityType[]> {
    const result = this.rabbitClient.send(
      ENTITY_TYPE_MULTIPLE_CREATED,
      createMultipleEntityTypeDto
    );
    return firstValueFrom(result);
  }

  @Post('/insert-all-entities')
  async insertAllEntities(
    @Body() createMultipleEntityDto: CreateMultipleEntityDto
  ): Promise<EntityModel[]> {
    const result = this.rabbitClient.send(
      ENTITY_MULTIPLE_CREATED,
      createMultipleEntityDto
    );
    return firstValueFrom(result);
  }

  @Post('/insert-all-entity-fields')
  async insertAllEntityFields(
    @Body() createMultipleEntityFieldDto: CreateMultipleEntityFieldDto
  ): Promise<EntityModel[]> {
    const result = this.rabbitClient.send(
      ENTITY_FIELD_MULTIPLE_CREATED,
      createMultipleEntityFieldDto
    );
    return firstValueFrom(result);
  }
}
