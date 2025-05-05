import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { EntityModel } from './entity.entity'; // assuming you have it
import { SchemaEntity } from '../decorators/schema-entity.decorator';

@SchemaEntity('main', 'document')
export class DocumentEntity {
  @PrimaryColumn({ name: 'doc_id', type: 'varchar', length: 100 })
  docId: string;

  @PrimaryColumn({ name: 'version', type: 'integer' })
  version: number;

  @Column({ name: 'real_name', type: 'text' })
  realName: string;

  @Column({ type: 'varchar', length: 250 })
  format: string;

  @Column({ name: 'uploaddate', type: 'timestamp' })
  uploadDate: Date;

  @Column({ name: 'updatedate', type: 'timestamp', nullable: true })
  updateDate?: Date;

  @Column({ name: 'link_type', type: 'text' })
  linkType: string;

  @Column({ type: 'text' })
  source: string;

  @Column({ name: 'last_modifier', type: 'text' })
  lastModifier: string;

  @Column({ type: 'text' })
  author: string;

  @Column({ type: 'text' })
  size: string;

  @Column({ type: 'text' })
  tags: string;

  @Column({ name: 'isactive', type: 'boolean' })
  isActive: boolean;

  @ManyToOne(() => EntityModel, (entity) => entity.documents, {
    onDelete: 'NO ACTION', // 🚨 does not delete if entity is deleted
    nullable: true,
  })
  @JoinColumn({ name: 'plant_id' })
  plant: EntityModel;
}
