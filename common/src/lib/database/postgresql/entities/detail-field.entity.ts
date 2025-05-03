import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { ChartDetail } from './chart-detail.entity';
import { EntityField } from './entity-field.entity'; // فرض کردم چنین موجودی داری

@SchemaEntity('main', 'details_fields')
export class DetailsField {
  @PrimaryGeneratedColumn({ name: 'df_id' })
  dfId: number;

  @Column({ name: 'detail_id', type: 'int' })
  detailId: number;

  @Column({ name: 'field_id', type: 'int' })
  fieldId: number;

  @Column({ name: 'unit', type: 'varchar', nullable: true })
  unit: string | null;

  @Column({ name: 'devide_by', type: 'int', nullable: true })
  devideBy: number | null;

  @Column({ name: 'opr_type', type: 'varchar', nullable: true })
  oprType: string | null;

  @Column({ name: 'chart_type', type: 'varchar', nullable: true })
  chartType: string | null;

  @ManyToOne(() => ChartDetail, (chartDetail) => chartDetail.detailsFields, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'detail_id' })
  chartDetail: ChartDetail;

  @ManyToOne(() => EntityField, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'field_id' })
  entityField: EntityField;
}
