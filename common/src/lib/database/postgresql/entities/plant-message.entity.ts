import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { EntityField } from './entity-field.entity';
import { AlarmCondition } from './alarm-condition';

@SchemaEntity('main', 'plant_message')
@Unique(['psValue', 'psBitNo', 'entityField'])
export class PlantMessage {
  @PrimaryGeneratedColumn({ name: 'ps_id' })
  psId: number;

  @Column({ name: 'ps_text', type: 'text', nullable: true })
  psText: string | null;

  @Column({ name: 'ps_value', type: 'integer', nullable: true })
  psValue: number | null;

  @Column({ name: 'ps_bit_no', type: 'integer', nullable: true })
  psBitNo: number | null;

  @ManyToOne(() => EntityField, { nullable: false })
  @JoinColumn({ name: 'efId' })
  entityField: EntityField; // Relation with entity_fields table

  @Column({ name: 'level', type: 'varchar', nullable: true })
  level: string | null;

  @Column({ name: 'alarm_id', type: 'integer', nullable: true })
  alarmId: number | null;

  @ManyToOne(() => AlarmCondition, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'alarm_condition_id' })
  alarmCondition: AlarmCondition | null;
}
