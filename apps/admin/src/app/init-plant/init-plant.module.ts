import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ElasticModule,
  EntityField,
  EntityModel,
  EntityType,
  PostgresModule,
  Source,
} from '@sephrmicroservice-monorepo/common';
import { InitPlantMicroserviceContrller } from './controllers/init-plant.controller';
import { InitPlantService } from './providers/init-plant.service';
import { SourceService } from './providers/source.service';
import { SourceController } from './controllers/source.controller';
import { RevertInitPlantMicroserviceContrller } from './controllers/revert-init-plant.controller';
import { RevertInitPlantService } from './providers/revert-init-plant.service';
import { AddMicroserviceController } from './controllers/add.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([EntityType, EntityModel, EntityField, Source]),
    PostgresModule,
    ElasticModule.register(),
  ],
  controllers: [
    InitPlantMicroserviceContrller,
    SourceController,
    RevertInitPlantMicroserviceContrller,
    AddMicroserviceController,
  ],
  providers: [InitPlantService, RevertInitPlantService, SourceService],
  exports: [InitPlantService, SourceService],
})
export class InitPlantModule {}
