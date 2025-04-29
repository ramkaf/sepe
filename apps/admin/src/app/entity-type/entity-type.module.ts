import { Module } from '@nestjs/common';
import { EntityTypeService } from './entity-type.service';
import { EntityTypeController } from './entity-type.controller';

@Module({
  controllers: [EntityTypeController],
  providers: [EntityTypeService],
})
export class EntityTypeModule {}
