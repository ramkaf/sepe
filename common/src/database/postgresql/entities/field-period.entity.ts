import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { EntityFieldFunctionEnum } from '../interfaces/entities/entity-field-condition-functions-enum';
import { EntityField } from './entity-field.entity';
import { RangeTypeEnum } from '../interfaces/time-range.enum';

@SchemaEntity('main', 'fields_period')
export class EntityFieldsPeriod {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'function_name',
    type: 'enum',
    enum: EntityFieldFunctionEnum,
    default: EntityFieldFunctionEnum.Avg,
  })
  functionName: EntityFieldFunctionEnum;

  @OneToOne(() => EntityField, { onDelete: 'SET NULL' }) // به جای CASCADE از 'SET NULL' استفاده کردیم
  @JoinColumn({ name: 'ef_id' })
  entityField: EntityField;

  @Column({ name: 'range_value', type: 'integer' })
  rangeValue: number;

  @Column({
    name: 'range_type',
    type: 'enum',
    enum: RangeTypeEnum,
    default: RangeTypeEnum.Minute,
  })
  rangeType: RangeTypeEnum;
}
