import { Module } from "@nestjs/common";
import { EntityFieldController } from "./entity-field.controller";
import { EntityFieldService } from "./entity-field.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityField } from "common/src/lib/database/postgresql";

@Module({
    imports : [TypeOrmModule.forFeature([EntityField])],
    controllers : [EntityFieldController],
    providers : [EntityFieldService],
    exports : [EntityFieldService]
})
export class EntityFieldModule {} 