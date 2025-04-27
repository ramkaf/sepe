import { Column, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { User } from './user.entity';

@SchemaEntity('main', 'permissions')
export class Permission {
  @PrimaryColumn({ name: 'per_id', type: 'int' })
  perId: number;

  @Column({ name: 'per_title', type: 'varchar', nullable: true })
  perTitle?: string;

  @ManyToMany(() => User, (user) => user.permissions)
  users: User[];
}
