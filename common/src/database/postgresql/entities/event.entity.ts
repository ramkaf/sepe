import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';

@SchemaEntity('events', 'event_logs')
export class EventLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_type: string;

  @Column()
  payload: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
