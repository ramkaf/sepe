import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EntityField,
  EntityModel,
  EntityType,
} from '@sephrmicroservice-monorepo/common';
import { InitPlantMicroserviceContrller } from './init-plant.controller';
import { InitPlantService } from './init-plant.service';

@Module({
  imports: [TypeOrmModule.forFeature([EntityType, EntityModel, EntityField])],
  controllers: [InitPlantMicroserviceContrller],
  providers: [InitPlantService],
  exports: [InitPlantService],
})
export class InitPlantModule {}
