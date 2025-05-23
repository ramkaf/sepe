import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection, DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { PostgresSchemasEnum } from 'common/src/lib/enums';
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
import { DetailField } from './entities/detail-field.entity';
import { FleetManager } from './entities/fleat-manager.entity';
import { CollectionEntity } from './entities/collection.entity';
import { DocumentEntity } from './entities/document.entity';
import { ApiLog } from './entities/log.entity';
import { browserGroupEntity } from './entities/browser-group.entity';
import { SchemaInitializer } from './models/schema-Initializer';

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
          DetailField,
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
          browserGroupEntity,
        ],
        synchronize: false,
        logging: configService.get<boolean>('POSTGRES_LOGGING', true),
      }),
      extraProviders: [{
        provide: 'SchemaInitializer',
        useFactory: (dataSource: DataSource) => new SchemaInitializer(dataSource),
        inject: [DataSource]
      }]
    }),
  ],
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: (dataSource: DataSource) => dataSource,
      inject: [DataSource],
    },
  ],
  exports: [TypeOrmModule, 'DATA_SOURCE'],
})
export class PostgresModule implements OnModuleInit {
  private readonly logger: Logger;
  constructor(
    private dataSource: DataSource,
  ) {
    this.logger = new Logger(PostgresModule.name);
  }
  private requiredSchemas = Object.values(PostgresSchemasEnum);
  async onModuleInit() {
    await this.ensureSchemasExist();
    await this.dataSource.synchronize(); 
    await this.ensureEntityTypeSequenceStartsAt233();
    await this.ensureEntitySequenceStartsAt944();
    await this.ensureEntityFieldSequenceStartsAt4372();
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
      this.logger.error('Error ensuring schemas exist:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  private async ensureEntityTypeSequenceStartsAt233(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.query(`
        DO $$
        DECLARE
          current_value bigint;
        BEGIN
          SELECT last_value INTO current_value FROM main.entity_types_et_id_seq;
          IF current_value < 233 THEN
            ALTER SEQUENCE main.entity_types_et_id_seq RESTART WITH 233;
          END IF;
        END $$;
      `);
    } catch (error) {
      console.error('Error ensuring sequence starts at 233:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  private async ensureEntitySequenceStartsAt944(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.query(`
        DO $$
        DECLARE
          current_value bigint;
        BEGIN
          SELECT last_value INTO current_value FROM main.entity_e_id_seq;
          IF current_value < 944 THEN
            ALTER SEQUENCE main.entity_e_id_seq RESTART WITH 944;
          END IF;
        END $$;
      `);
    } catch (error) {
      console.error('Error ensuring entity sequence starts at 944:', error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
  private async ensureEntityFieldSequenceStartsAt4372(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.query(`
        DO $$
        DECLARE
          current_value bigint;
        BEGIN
          SELECT last_value INTO current_value FROM main.entity_fields_ef_id_seq;
          IF current_value < 4372 THEN
            ALTER SEQUENCE main.entity_fields_ef_id_seq RESTART WITH 4372;
          END IF;
        END $$;
      `);
    } catch (error) {
      console.error(
        'Error ensuring entity field sequence starts at 4372:',
        error
      );
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
