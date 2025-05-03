import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { SchemaEntity } from '../decorators/schema-entity.decorator';

@SchemaEntity('main', 'log')
export class ApiLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: 'varchar', length: 100, nullable: true })
  userId: string | null;

  @ManyToOne(() => User, (user) => user.log, { nullable: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ type: 'varchar', length: 10 })
  method: string;

  @Index()
  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  params: object;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  queryParams: object;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  body: object;

  @Column({ type: 'integer' })
  statusCode: number;

  @Column({ type: 'text', nullable: true })
  errorMessage?: string;

  @Index()
  @Column({ type: 'varchar', length: 10 })
  status: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  ipAddress?: string;

  @Column({ type: 'json', nullable: true })
  rawRequest?: object;

  @CreateDateColumn({ type: 'timestamptz', name: 'req_date' })
  reqDate: Date;
}
