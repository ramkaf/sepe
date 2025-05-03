import {
  Collection,
  Column,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { EntityType } from './entity-types.entity';
import { User } from './user.entity';
import { Chart } from './charts.entity';
import { Soiling } from './soiling.entity';
import { ChartEntity } from './chart-entity.entity';
import { FleetManager } from './fleat-manager.entity';
import { AlarmConfigEntity } from './alarm-config.entity';
import { CollectionEntity } from './collection.entity';
import { DocumentEntity } from './document.entity';

@SchemaEntity('main' , 'entity')
export class EntityModel {
  @PrimaryGeneratedColumn({ name: 'e_id' })
  @Index({ unique: true })
  eId: number;

  @Column({ name: 'entity_name', type: 'varchar', nullable: true })
  entityName: string | null;

  @Column({ name: 'entity_tag', type: 'varchar', unique: true })
  @Index({ unique: true })
  entityTag: string;

  @Column({ name: 'parent_in_tree_id', type: 'int', nullable: true })
  parentInTreeId: number | null;

  @Column({ name: 'entity_type_id', type: 'int', nullable: true })
  entityTypeId: number | null;

  @ManyToOne(() => EntityType, (entityType) => entityType.etId, {
    nullable: true,
  })
  @JoinColumn({ name: 'entity_type_id' })
  entityType: EntityType;

  @ManyToMany(() => User, (user) => user.entities)
  users: User[];

  @OneToMany(() => Chart, (chart) => chart.plant)
  charts: Chart[];

  @OneToMany(() => Soiling, (soiling) => soiling.baseEntity)
  baseSoilings: Soiling[];

  @OneToMany(() => Soiling, (soiling) => soiling.plant)
  plantSoilings: Soiling[];

  @ManyToMany(() => Soiling, (soiling) => soiling.entities)
  @JoinTable({
    name: 'soiling_entities', 
    joinColumn: {
      name: 'entity_id',
      referencedColumnName: 'eId',
    },
    inverseJoinColumn: {
      name: 'soiling_id',
      referencedColumnName: 'id',
    },
  })
  soilings: Soiling[];
  
  @OneToMany(() => ChartEntity, (chartEntity) => chartEntity.entity)
  chartEntities: ChartEntity[];

  @OneToOne(() => FleetManager, (fm) => fm.plant, { cascade: true })
  fleetManager: FleetManager;

  @OneToMany(() => AlarmConfigEntity, (alarmConfig) => alarmConfig.plant)
  alarmConfigs: AlarmConfigEntity[];

  @OneToMany(() => CollectionEntity, (collection) => collection.entity)
  collections: CollectionEntity[];

  @OneToMany(() => DocumentEntity, (document) => document.plant)
  documents: DocumentEntity[];
}
