import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { User } from './user.entity';

@SchemaEntity('main', 'user_components_config')
export class UserComponentsConfig {
  @PrimaryGeneratedColumn({ name: 'ucc_id' })
  uccId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.userComponentsConfigs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'component_tag', type: 'varchar', nullable: true })
  componentTag: string;

  @Column({ type: 'integer', nullable: true })
  x: number;

  @Column({ type: 'integer', nullable: true })
  y: number;

  @Column({ type: 'integer', nullable: true })
  rows: number;

  @Column({ type: 'integer', nullable: true })
  cols: number;

  @Column({ name: 'component_title', type: 'varchar', nullable: true })
  componentTitle: string;

  @Column({ name: 'plant_id', type: 'integer', nullable: true })
  plantId: number;
}
