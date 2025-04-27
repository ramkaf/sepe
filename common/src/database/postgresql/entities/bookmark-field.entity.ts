import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  Index,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { User } from './user.entity';
import { EntityField } from './entity-field.entity';

@SchemaEntity('main', 'bookmark_field')
@Index('unique_user_ef_idx', ['entityField', 'user'], { unique: true })
export class BookmarkField {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EntityField, (field) => field.bookmarkFields, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ef_id' })
  entityField: EntityField;

  @ManyToOne(() => User, (user) => user.bookmarkFields, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({
    name: 'createdat',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;
}
