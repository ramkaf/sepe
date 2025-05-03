import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntityModel } from './entity.entity';
import { SchemaEntity } from '../decorators/schema-entity.decorator';

@SchemaEntity('main', 'alarm_config')
export class AlarmConfigEntity {
  @PrimaryGeneratedColumn({ name: 'ac_id' })
  id: number;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  tag: string;

  @ManyToOne(() => EntityModel, (e) => e.alarmConfigs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'plant_id' })
  plant: EntityModel;
}
