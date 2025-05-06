import {
  Collection,
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { UserRole, OtpPath } from 'common/src/lib/enums';
import { EntityModel } from './entity.entity';
import { Permission } from './permissions.entity';
import { UserComponentsConfig } from './components.entity';
import { Chart } from './charts.entity';
import { UserChart } from './user-chart.entity';
import { BookmarkField } from './bookmark-field.entity';
import { Soiling } from './soiling.entity';
import { CollectionEntity } from './collection.entity';
import { ApiLog } from './log.entity';

@SchemaEntity('main', 'users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'firstName', type: 'varchar', length: 50, nullable: true })
  firstName?: string;

  @Column({ name: 'lastName', type: 'varchar', length: 50, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  username: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
    nullable: true,
  })
  role?: UserRole;

  @Column({ type: 'varchar', length: 20, nullable: true })
  mobile?: string;

  @Column({ type: 'varchar', nullable: true })
  password?: string;

  @Column({ name: 'phoneNumber', type: 'varchar', nullable: true })
  phoneNumber?: string;

  @Column({
    name: 'isActive',
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column({
    name: 'otp_path',
    type: 'enum',
    enum: OtpPath,
    default: OtpPath.Email,
  })
  otpPath: OtpPath;

  @ManyToMany(() => Permission, (permission) => permission.perId)
  @JoinTable({
    name: 'users_permissions',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'perId',
    },
  })
  permissions: Permission[];

  @ManyToMany(() => EntityModel, (entity) => entity.eId)
  @JoinTable({
    name: 'user_entity',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'entity_id',
      referencedColumnName: 'eId',
    },
  })
  entities: EntityModel[];

  @OneToMany(() => UserComponentsConfig, (config) => config.user)
  userComponentsConfigs: UserComponentsConfig[];

  @OneToMany(() => UserChart, (userChart) => userChart.user)
  userCharts: UserChart[];

  @OneToMany(() => BookmarkField, (bookmark) => bookmark.user)
  bookmarkFields: BookmarkField[];

  @OneToMany(() => Soiling, (soiling) => soiling.user)
  soilingRecords: Soiling[];

  @OneToMany(() => CollectionEntity, (collection) => collection.user)
  collections: CollectionEntity[];

  @OneToMany(() => ApiLog, (apiLog) => apiLog.user)
  log: ApiLog[];
}
