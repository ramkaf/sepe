import {
  Column,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { EntityType } from './entity-types.entity';
import { AlertConfigMessage } from './alert-config-message.entity';
import { BookmarkField } from './bookmark-field.entity';
import { EntityFieldCondition } from './field-condition.entity';
import { EntityFieldsPeriod } from './field-period.entity';
import { Soiling } from './soiling.entity';
import { DetailsField } from './detail-field.entity';
import { CollectionEntity } from './collection.entity';

@SchemaEntity('main', 'entity_fields')
@Unique(['field_tag', 'entity_type_id'])
export class EntityField {
  @PrimaryGeneratedColumn({ name: 'ef_id' })
  ef_id: number;

  @Column({ name: 'field_title', type: 'varchar' })
  field_title: string | null;

  @Column({ name: 'field_tag', type: 'varchar' })
  field_tag: string;

  @Column({ name: 'unit', type: 'varchar', nullable: true })
  unit: string | null;

  @Column({ name: 'is_computational', type: 'boolean', default: false })
  is_computational: boolean;

  @Column({ name: 'last_value_function_name', type: 'varchar', nullable: true })
  last_value_function_name: string | null;

  @Column({ name: 'all_values_function_name', type: 'varchar', nullable: true })
  all_values_function_name: string | null;

  @Column({ name: 'browser_group', type: 'varchar', default: 'Parameters' })
  browser_group: string | null;

  @Column({ name: 'is_static', type: 'boolean', default: false })
  is_static: boolean;

  @Column({ name: 'static_value', type: 'varchar', default: '' })
  static_value: string;

  @Column({ name: 'mask_function', type: 'varchar', nullable: true })
  mask_function: string | null;

  @Column({
    name: 'field_type',
    type: 'varchar',
    length: 255,
    default: 'value',
  })
  field_type: string;

  @Column({ name: 'default_cache_value', type: 'varchar', nullable: true })
  default_cache_value: string | null;

  @Column({ name: 'entity_type_id', type: 'int' })
  entity_type_id: number | null;

  @ManyToOne(() => EntityType)
  @JoinColumn({ name: 'entity_type_id' })
  entity_type: EntityType;

  @OneToMany(() => AlertConfigMessage, (msg) => msg.entityField)
  alertConfigMessages: AlertConfigMessage[];

  @OneToMany(() => BookmarkField, (bookmark) => bookmark.entityField)
  bookmarkFields: BookmarkField[];

  @OneToMany(() => EntityFieldCondition, (cond) => cond.entityField)
  conditions: EntityFieldCondition[];

  @OneToMany(() => EntityFieldCondition, (cond) => cond.dependentField)
  dependentConditions: EntityFieldCondition[];

  @OneToOne(
    () => EntityFieldsPeriod,
    (fieldsPeriod) => fieldsPeriod.entityField
  )
  fieldsPeriod: EntityFieldsPeriod;

  @OneToMany(() => Soiling, (soiling) => soiling.baseStringVoltage)
  soilingBaseVoltages: Soiling[];

  @OneToMany(() => Soiling, (soiling) => soiling.baseStringCurrent)
  soilingBaseCurrents: Soiling[];

  @ManyToMany(() => Soiling, (soiling) => soiling.entityFields)
  soilingFields: Soiling[];

  @OneToMany(() => DetailsField, (detailsField) => detailsField.chartDetail)
  detailsFields: DetailsField[];

  @ManyToMany(() => CollectionEntity, (collection) => collection.entityFields)
  collections: CollectionEntity[];
}
