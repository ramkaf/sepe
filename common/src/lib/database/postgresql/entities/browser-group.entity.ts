import {
  Column,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityField } from './entity-field.entity';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { BrowserGroupEnum } from 'common/src/lib/enums';

@SchemaEntity('main', 'browser_group')
@Index(['efId', 'name'])
export class browserGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BrowserGroupEnum,
    default: BrowserGroupEnum.PARAMETERS,
  })
  name: BrowserGroupEnum;

  @Column({ name: 'ef_id', type: 'int' })
  efId: number;

  @ManyToOne(() => EntityField, (entityField) => entityField.browserGroup, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ef_id' })
  entityField: EntityField;
}
