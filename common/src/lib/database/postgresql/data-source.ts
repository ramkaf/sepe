// data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './entities/user.entity';
import { EntityModel } from './entities/entity.entity';
import { browserGroupEntity } from './entities/browser-group.entity';
import { DocumentEntity } from './entities/document.entity';
import { CollectionEntity } from './entities/collection.entity';
import { AlarmConfigEntity } from './entities/alarm-config.entity';
import { AlertConfigMessage } from './entities/alert-config-message.entity';
import { BookmarkField } from './entities/bookmark-field.entity';
import { EntityFieldCondition } from './entities/field-condition.entity';
import { EntityFieldsPeriod } from './entities/field-period.entity';
import { Soiling } from './entities/soiling.entity';
import { PlantMessage } from './entities/plant-message.entity';
import { AlarmCondition } from './entities/alarm-condition';
import { UserChart } from './entities/user-chart.entity';
import { ChartEntity } from './entities/chart-entity.entity';
import { DetailField } from './entities/detail-field.entity';
import { ChartDetail } from './entities/chart-detail.entity';
import { Chart } from './entities/charts.entity';
import { EntityField } from './entities/entity-field.entity';
import { FleetManager } from './entities/fleat-manager.entity';
import { EntityType } from './entities/entity-types.entity';
import { UserComponentsConfig } from './entities/components.entity';
import { Permission } from './entities/permissions.entity';
import { ApiLog } from './entities/log.entity';
import { Source } from './entities/sources.entity';
// import all other entities...

dotenv.config(); // Load .env values

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['POSTGRES_HOST'] || 'localhost',
  port: Number(process.env['POSTGRES_PORT']) || 5432,
  username: process.env['POSTGRES_USER'] || 'postgres',
  password: process.env['POSTGRES_PASSWORD'] || 'postgres',
  database: process.env['POSTGRES_DB'] || 'postgres',
  synchronize: false, // set true only for dev
  logging: true,
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
});
