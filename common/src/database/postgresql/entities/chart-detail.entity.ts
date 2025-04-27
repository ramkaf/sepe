import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { Chart } from './charts.entity';
import { EntityType } from './entity-types.entity';
import { DetailsField } from './detail-field.entity';
import { ChartEntity } from './chart-entity.entity';


@SchemaEntity('main', 'chart_details')
export class ChartDetail {
  @PrimaryGeneratedColumn({ name: 'detail_id' })
  detailId: number;

  @Column({ name: 'detail_title', type: 'varchar', nullable: true })
  detailTitle: string | null;

  @Column({ name: 'detail_des', type: 'varchar', nullable: true })
  detailDes: string | null;

  @Column({ name: 'group_type', type: 'varchar', nullable: true })
  groupType: string | null;

  @Column({ name: 'chart_id', type: 'int' })
  chartId: number;

  @Column({ name: 'entity_type_id', type: 'int', nullable: true })
  entityTypeId: number | null;

  @ManyToOne(() => Chart, (chart) => chart.chartDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chart_id' })
  chart: Chart;

  @ManyToOne(() => EntityType, (entityType) => entityType.chartDetails, { nullable: true })
  @JoinColumn({ name: 'entity_type_id' })
  entityType: EntityType | null;

  @OneToMany(() => DetailsField, (detailsField) => detailsField.chartDetail)
  detailsFields: DetailsField[];

  @OneToMany(() => ChartEntity, (chartEntity) => chartEntity.chartDetail)
chartEntities: ChartEntity[];
}
