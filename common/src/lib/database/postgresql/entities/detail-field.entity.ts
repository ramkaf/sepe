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
import { ChartTypeEnum, OperationTypeEnum } from 'common/src/lib/enums';
import { UnitEnum } from 'common/src/lib/enums/entities/unit.interface';

@SchemaEntity('main', 'details_fields')
export class DetailField {
  @PrimaryGeneratedColumn({ name: 'df_id' })
  dfId: number;

  @Column({ name: 'detail_id', type: 'int' })
  detailId: number;

  @Column({ name: 'field_id', type: 'int' })
  fieldId: number;

  @Column({ name: 'unit', type: 'enum',enum:UnitEnum })
  unit: string;

  @Column({ name: 'devide_by', type: 'int', default:1 })
  devideBy: number;

  @Column({ name: 'opr_type', type: 'enum',enum:OperationTypeEnum , default :OperationTypeEnum.AVG })
  oprType: OperationTypeEnum;

  @Column({ name: 'chart_type', type: 'enum',enum:ChartTypeEnum,default:ChartTypeEnum.LINE})
  chartType: ChartTypeEnum;

  @ManyToOne(() => ChartDetail, (chartDetail) => chartDetail.detailsFields, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'detail_id' })
  chartDetail: ChartDetail;

  @ManyToOne(() => EntityField, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'field_id' })
  entityField: EntityField;
}
