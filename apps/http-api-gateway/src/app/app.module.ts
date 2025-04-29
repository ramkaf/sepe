import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
  controllers: [],
  providers: [],
})
export class AppModule {}
