import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EntityController } from './entity/entity.controller';
import { EntityService } from './entity/entity.service';
import { AdminMicroserviceController } from './admin.controller';
import { EntityFieldController } from './entity-fields/entity-field.controller';
import { EntityTypeController } from './entity-type/entity-type.controller';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name : 'ADMIN_SERVICE',
        transport : Transport.RMQ,
        options : {
          urls : ['amqp://localhost:5672'],
          queue : 'admin-queue'
        }
      }
    ]),
  ],
  controllers: [AdminMicroserviceController],
  providers: [AdminMicroserviceController],
})
export class AdminModule {}
