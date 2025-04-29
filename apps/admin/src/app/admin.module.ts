import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import {AlarmCondition, PostgresModule} from './../../../../common/src/lib/database/postgresql'
import {ElasticModuleVersion2} from './../../../../common/src/lib/database/elastic/elastic2.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminMicroserviceController } from './admin.controller';
import { AdminService } from './admin.service';
import { EntityFieldModule } from './entity-fields/entity-field.module';
import { EntityTypeModule } from './entity-type/entity-type.module';
import { EntityModule } from './entity/entity.module';
import { ChartDetailModule } from './chart-detail/chart-detail.module';
import { ChartModule } from './chart/chart.module';
import { ChartEntityModule } from './chart-entity/chart-entity.module';
import { DetailFieldModule } from './detail-field/detail-field.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    PostgresModule,
    ClientsModule.register([{
    name : 'KAFKA_SERVICE',
    transport : Transport.KAFKA,
    options : {
      client : {
        brokers : ['localhost:9092']
      }
    }
  }]),
  EntityFieldModule,
  EntityTypeModule,
  EntityModule,
  ChartDetailModule,
  ChartModule,
  ChartEntityModule,
  DetailFieldModule
],
  controllers: [AdminMicroserviceController],
  providers: [AdminService],
})
export class AdminModule {}
