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
import { BrowserGroupEnum } from '../interfaces/entities/browser-group.interface';

@SchemaEntity('main', 'browser_group')
@Index(['entityField', 'name'])
export class browserGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: BrowserGroupEnum,
    default: BrowserGroupEnum.PARAMETERS,
  })
  name: BrowserGroupEnum;

  @ManyToOne(() => EntityField, { nullable: false })
  @JoinColumn({ name: 'entityFieldId' })
  entityField: EntityField;
}
