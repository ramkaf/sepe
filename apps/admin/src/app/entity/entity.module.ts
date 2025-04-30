import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityModel } from '@sephrmicroservice-monorepo/common';

@Module({
  imports : [],
  controllers: [EntityController],
  providers: [EntityService],
})
export class EntityModule {}
