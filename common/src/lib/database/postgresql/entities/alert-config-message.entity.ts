import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { EntityField } from './entity-field.entity';

@SchemaEntity('main', 'alert_config_message')
export class AlertConfigMessage {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'efId' })
  efId: number;

  @ManyToOne(() => EntityField, (field) => field.alertConfigMessages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'efId' })
  entityField: EntityField;

  @Column({ name: 'condition', type: 'varchar', nullable: true })
  condition: string | null;

  @Column({ name: 'value', type: 'double precision', nullable: true })
  value: number | null;

  @Column({ name: 'message', type: 'varchar', nullable: true })
  message: string | null;

  @Column({ name: 'severity', type: 'varchar', nullable: true })
  severity: string | null;
}
