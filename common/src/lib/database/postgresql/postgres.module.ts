import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection, DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { PostgresSchemasEnum } from './interfaces/schemas.enum';
import { EntityType } from './entities/entity-types.entity';
import { EntityModel } from './entities/entity.entity';
import { AlarmConfigEntity } from './entities/alarm-config.entity';
import { Permission } from './entities/permissions.entity';
import { UserComponentsConfig } from './entities/components.entity';
import { Chart } from './entities/charts.entity';
import { UserChart } from './entities/user-chart.entity';
import { EntityField } from './entities/entity-field.entity';
import { AlertConfigMessage } from './entities/alert-config-message.entity';
import { BookmarkField } from './entities/bookmark-field.entity';
import { EntityFieldCondition } from './entities/field-condition.entity';
import { EntityFieldsPeriod } from './entities/field-period.entity';
import { AlarmCondition } from './entities/alarm-condition';
import { PlantMessage } from './entities/plant-message.entity';
import { Soiling } from './entities/soiling.entity';
import { ChartDetail } from './entities/chart-detail.entity';
import { ChartEntity } from './entities/chart-entity.entity';
import { Source } from './entities/sources.entity';
import { DetailsField } from './entities/detail-field.entity';
import { FleetManager } from './entities/fleat-manager.entity';
import { CollectionEntity } from './entities/collection.entity';
import { DocumentEntity } from './entities/document.entity';
import { ApiLog } from './entities/log.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST', 'localhost'),
        port: configService.get<number>('POSTGRES_PORT', 5432),
        username: configService.get('POSTGRES_USER', 'postgres'),
        password: configService.get('POSTGRES_PASSWORD', 'postgres'),
        database: configService.get('POSTGRES_DB', 'postgres'),
        entities: [
          Source,
          User,
          ApiLog,
          Permission,
          UserComponentsConfig,
          EntityType,
          EntityModel,
          FleetManager,
          EntityField,
          Chart,
          ChartDetail,
          DetailsField,
          ChartEntity,
          UserChart,
          AlarmCondition,
          PlantMessage,
          Soiling,
          EntityFieldsPeriod,
          EntityFieldCondition,
          BookmarkField,
          AlertConfigMessage,
          AlarmConfigEntity,
          CollectionEntity,
          DocumentEntity,
        ],
        synchronize: configService.get<boolean>('POSTGRES_SYNCHRONIZE', false),
        logging: configService.get<boolean>('POSTGRES_LOGGING', true),
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class PostgresModule implements OnModuleInit {
  constructor(private dataSource: DataSource) {}
  private requiredSchemas = Object.values(PostgresSchemasEnum);
  async onModuleInit() {
    await this.ensureSchemasExist();
  }

  private async ensureSchemasExist(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      const result = await queryRunner.query(
        "SELECT schema_name FROM information_schema.schemata WHERE schema_name NOT LIKE 'pg_%' AND schema_name != 'information_schema'"
      );
      const existingSchemas = result.map((row: any) => row.schema_name);
      for (const schema of this.requiredSchemas) {
        if (!existingSchemas.includes(schema))
          await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
      }
    } catch (error) {
      const e = error as Error;
      console.error('Error ensuring schemas exist:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
