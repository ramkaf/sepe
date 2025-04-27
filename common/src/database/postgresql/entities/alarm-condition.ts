import { Column, OneToMany, PrimaryColumn } from 'typeorm';
import { SchemaEntity } from '../decorators/schema-entity.decorator';
import { PlantMessage } from './plant-message.entity';

@SchemaEntity('main', 'alarm_condition')
export class AlarmCondition {
  @PrimaryColumn({ name: 'id', type: 'integer' })
  id: number;

  @Column({ name: 'service_name', type: 'varchar', nullable: true })
  serviceName: string | null;

  @Column({ name: 'plant_id', type: 'integer', nullable: true })
  plantId: number | null;

  @OneToMany(() => PlantMessage, (pm) => pm.alarmCondition)
  userCharts: PlantMessage[];
}
