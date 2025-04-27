import { Module } from '@nestjs/common';
import { AdminMicroserviceController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([{
    name : 'KAFKA_SERVICE',
    transport : Transport.KAFKA,
    options : {
      client : {
        brokers : ['localhost:9092']
      }
    }
  }])],
  controllers: [AdminMicroserviceController],
  providers: [AppService],
})
export class AppModule {}
