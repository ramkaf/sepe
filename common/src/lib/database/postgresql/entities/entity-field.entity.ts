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
import { DetailField } from './detail-field.entity';
import { CollectionEntity } from './collection.entity';
import { browserGroupEntity } from './browser-group.entity';
import { EntityFieldTypeEnum } from 'common/src/lib/enums';
import { UnitEnum } from 'common/src/lib/enums/entities/unit.interface';

@SchemaEntity('main', 'entity_fields')
@Unique(['fieldTag', 'etId'])
export class EntityField {
  @PrimaryGeneratedColumn({ name: 'ef_id' })
  efId: number;

  @Column({ name: 'field_title', type: 'varchar' })
  fieldTitle: string | null;

  @Column({ name: 'field_tag', type: 'varchar' })
  fieldTag: string;

  @Column({
    name: 'unit',
    type: 'enum',
    enum: UnitEnum,
    default: null,
    nullable: true,
  })
  unit: UnitEnum;

  @Column({ name: 'is_computational', type: 'boolean', default: false })
  isComputational: boolean;

  @Column({ name: 'last_value_function_name', type: 'varchar', nullable: true })
  lastValueFunctionName: string | null;

  @Column({ name: 'all_values_function_name', type: 'varchar', nullable: true })
  allValuesFunctionName: string | null;

  @Column({ name: 'is_static', type: 'boolean', default: false })
  isStatic: boolean;

  @Column({ name: 'static_value', type: 'varchar', default: '' })
  staticValue: string;

  @Column({ name: 'mask_function', type: 'varchar', nullable: true })
  maskFunction: string | null;

  @Column({
    name: 'field_type',
    type: 'enum',
    enum: EntityFieldTypeEnum,
    default: EntityFieldTypeEnum.VALUE,
  })
  fieldType: EntityFieldTypeEnum;

  @Column({ name: 'default_cache_value', type: 'varchar', nullable: true })
  defaultCacheValue: string | null;

  @Column({ name: 'entity_type_id', type: 'int' })
  etId: number | null;

  @ManyToOne(() => EntityType)
  @JoinColumn({ name: 'etId' })
  entity_type: EntityType;

  @OneToOne(
    () => EntityFieldsPeriod,
    (fieldsPeriod) => fieldsPeriod.entityField
  )
  fieldsPeriod: EntityFieldsPeriod;

  @OneToMany(() => AlertConfigMessage, (msg) => msg.entityField)
  alertConfigMessages: AlertConfigMessage[];

  @OneToMany(() => BookmarkField, (bookmark) => bookmark.entityField)
  bookmarkFields: BookmarkField[];

  @OneToMany(() => EntityFieldCondition, (cond) => cond.entityField)
  conditions: EntityFieldCondition[];

  @OneToMany(() => EntityFieldCondition, (cond) => cond.dependentField)
  dependentConditions: EntityFieldCondition[];

  @OneToMany(() => Soiling, (soiling) => soiling.baseStringVoltage)
  soilingBaseVoltages: Soiling[];

  @OneToMany(() => Soiling, (soiling) => soiling.baseStringCurrent)
  soilingBaseCurrents: Soiling[];

  @ManyToMany(() => Soiling, (soiling) => soiling.entityFields)
  soilingFields: Soiling[];

  @OneToMany(() => DetailField, (detailsField) => detailsField.chartDetail)
  detailsFields: DetailField[];

  @ManyToMany(() => CollectionEntity, (collection) => collection.entityFields)
  collections: CollectionEntity[];

  @OneToMany(() => browserGroupEntity, (bwe) => bwe.entityField)
  browserGroup: browserGroupEntity[];
}
