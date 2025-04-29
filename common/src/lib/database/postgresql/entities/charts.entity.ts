import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { EntityModel } from './entity.entity';
import { UserChart } from './user-chart.entity';
import { ChartDetail } from './chart-detail.entity';

@SchemaEntity('main', 'charts')
export class Chart {
  @PrimaryGeneratedColumn({ name: 'chart_id' })
  chartId: number;

  @Column({ name: 'plant_id', type: 'integer' })
  plantId: number;

  @ManyToOne(() => EntityModel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'plant_id' })
  plant: EntityModel;

  @Column({ name: 'chart_title', type: 'varchar', nullable: true })
  chartTitle: string | null;

  @Column({ name: 'chart_des', type: 'varchar', nullable: true })
  chartDes: string | null;

  @Column({ name: 'time_group', type: 'integer', nullable: true })
  timeGroup: number | null;

  @Column({ name: 'time_group_type', type: 'varchar', nullable: true })
  timeGroupType: string | null;

  @OneToMany(() => UserChart, (userChart) => userChart.chart)
  userCharts: UserChart[];

  @OneToMany(() => ChartDetail, (chartDetail) => chartDetail.chart)
  chartDetails: ChartDetail[];
}
