import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { AbstractionLevel } from '../interfaces/entities/abstract-level.interface';
import { EntityModel } from './entity.entity';
import { Soiling } from './soiling.entity';
import { ChartDetail } from './chart-detail.entity';

@SchemaEntity('main', 'entity_types')
export class EntityType {
  @PrimaryGeneratedColumn({ name: 'et_id' })
  etId: number;

  @Column()
  name: string;

  @Column()
  tag: string;

  @Column({ nullable: true })
  description?: string;

  @Column({
    name: 'abstraction_level',
    type: 'enum',
    enum: AbstractionLevel,
    nullable: true,
  })
  abstractionLevel?: AbstractionLevel;

  @Column({ name: 'plant_id', type: 'int', nullable: true })
  plantId?: number;

  @OneToMany(() => EntityModel, (entity) => entity.entityType)
  entities: EntityModel[];

  @OneToMany(() => Soiling, (soiling) => soiling.entityType)
  soilings: Soiling[];

  @OneToMany(() => ChartDetail, (chartDetail) => chartDetail.entityType)
  chartDetails: ChartDetail[];
}
