import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EntityController } from './controllers/admin/entity.controller';
import { EntityFieldController } from './controllers/admin/entity-field.controller';
import { EntityTypeController } from './controllers/admin/entity-type.controller';
@Module({
  imports: [ClientsModule.register([
    {
      name : 'KAFKA_SERVICE',
      transport : Transport.KAFKA ,
      options : {
        client : {
          brokers : ['localhost:9092']
        }
      }
    }
  ])],
  controllers: [EntityFieldController , EntityTypeController , EntityController],
  providers: [],
})
export class AppModule {}
