import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityMicroserviceController } from './entity.controller';

@Module({
  imports: [],
  controllers: [EntityMicroserviceController],
  providers: [EntityService],
})
export class EntityModule {}
