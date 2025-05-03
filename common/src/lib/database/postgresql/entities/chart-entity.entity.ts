import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { ChartDetail } from './chart-detail.entity';
import { EntityModel } from './entity.entity'; // موجوده تو پروژه‌ت (همون Entity که داری)

@SchemaEntity('main', 'chart_entities')
export class ChartEntity {
  @PrimaryGeneratedColumn({ name: 'che_id' })
  cheId: number;

  @Column({ name: 'detail_id', type: 'int' })
  detailId: number;

  @Column({ name: 'entity_id', type: 'int' })
  entityId: number;

  @Column({ name: 'chart_entity_title', type: 'varchar', nullable: true })
  chartEntityTitle: string | null;

  @ManyToOne(() => ChartDetail, (chartDetail) => chartDetail.chartEntities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'detail_id' })
  chartDetail: ChartDetail;

  @ManyToOne(() => EntityModel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'entity_id' })
  entity: EntityModel;
}
