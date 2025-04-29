import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';

@SchemaEntity('main', 'sources')
export class Source {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'key', type: 'varchar' })
  key: string;

  @Column({ name: 'source_name', type: 'varchar' })
  sourceName: string;

  @Column({ name: 'plant_id', type: 'int' })
  plantId: number;
}
