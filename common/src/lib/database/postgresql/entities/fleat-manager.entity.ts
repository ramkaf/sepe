import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EntityModel } from './entity.entity';
import { SchemaEntity } from '../decorators/schema-entity.decorator';

@SchemaEntity('main', 'fleet_manager')
export class FleetManager {
  @PrimaryGeneratedColumn({ name: 'fm_id' })
  id: number;

  @Column({ name: 'service', type: 'varchar', nullable: true })
  service: string;

  @OneToOne(() => EntityModel, (plant) => plant.fleetManager)
  @JoinColumn({ name: 'plant_id' }) // This defines the FK column
  plant: EntityModel;
}
