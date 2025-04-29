import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { User } from './user.entity';
import { EntityType } from './entity-types.entity';
import { EntityField } from './entity-field.entity';
import { EntityModel } from './entity.entity';

@SchemaEntity('main', 'soiling')
export class Soiling {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 255, nullable: true })
  title: string | null;

  @ManyToOne(() => EntityModel)
  @JoinColumn({ name: 'base_entity' })
  baseEntity: EntityModel;

  @ManyToOne(() => EntityModel)
  @JoinColumn({ name: 'plant_id' })
  plant: EntityModel;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => EntityType)
  @JoinColumn({ name: 'et_id' })
  entityType: EntityType;

  @ManyToOne(() => EntityField, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'base_string_voltage' })
  baseStringVoltage: EntityField;

  @ManyToOne(() => EntityField, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'base_string_current' })
  baseStringCurrent: EntityField;

  @ManyToMany(() => EntityModel, (entity) => entity.soilings)
  entities: EntityModel[];

  @ManyToMany(() => EntityField, (field) => field.soilingFields)
  @JoinTable({
    name: 'soiling_entity_fields',
    joinColumn: {
      name: 'soiling_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'field_id',
      referencedColumnName: 'ef_id',
    },
  })
  entityFields: EntityField[];
}
