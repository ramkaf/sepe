import { Module } from '@nestjs/common';
import { EntityTypeService } from './entity-type.service';
import { EntityTypeMicroserviceController } from './entity-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityType } from '@sephrmicroservice-monorepo/common';

@Module({
  imports: [TypeOrmModule.forFeature([EntityType])],
  controllers: [EntityTypeMicroserviceController],
  providers: [EntityTypeService],
})
export class EntityTypeModule {}
