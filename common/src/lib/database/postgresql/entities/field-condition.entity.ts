import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { EntityField } from './entity-field.entity';
import { EntityFieldFunctionEnum } from '../interfaces/entities/entity-field-condition-functions-enum';
import { EntityFieldConditionOperatorEnum } from '../interfaces/entities/entity-fields-condition-operators.enum';

@SchemaEntity('main', 'entity_field_condition')
@Unique(['entityField', 'dependentField'])
export class EntityFieldCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EntityField, (field) => field.conditions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'efId' })
  entityField: EntityField;

  @ManyToOne(() => EntityField, (field) => field.dependentConditions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'efId_depend' })
  dependentField: EntityField;

  @Column({ type: 'integer', default: 0 })
  value: number;

  @Column({
    type: 'enum',
    enum: EntityFieldConditionOperatorEnum,
    default: EntityFieldConditionOperatorEnum.GreaterThan,
  })
  condition: EntityFieldConditionOperatorEnum;

  @Column({
    type: 'enum',
    enum: EntityFieldFunctionEnum,
    default: EntityFieldFunctionEnum.Avg, // Default to 'avg'
  })
  efcFunction: EntityFieldFunctionEnum;
}
