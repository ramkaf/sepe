import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { AlarmCondition, EntityField } from 'common/src/lib/database/postgresql';
import { Repository } from 'typeorm';

@Injectable()
export class EntityFieldService {
  constructor(
    @InjectRepository(EntityField)
    private readonly entityFieldRepository: Repository<EntityField>,
  
    @Inject('ADMIN_SERVICE')
    private readonly rabbitClient: ClientProxy
  ) {}
  
  async createAlarmCondition(): Promise<EntityField> {
    const newAlarmCondition = this.entityFieldRepository.create({

    });

    return await this.entityFieldRepository.save(newAlarmCondition);
  }
}