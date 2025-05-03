import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlarmCondition } from 'common/src/lib/database/postgresql';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AlarmCondition)
    private readonly alarmConditionRepository: Repository<AlarmCondition>
  ) {}

  async createAlarmCondition(): Promise<AlarmCondition> {
    const newAlarmCondition = this.alarmConditionRepository.create({
      id: 1,
      serviceName: 'Temperature Monitoring',
      plantId: 1001,
    });

    return await this.alarmConditionRepository.save(newAlarmCondition);
  }
}
