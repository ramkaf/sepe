import { Controller } from '@nestjs/common';
import { DetailFieldService } from './detail-field.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  DETAIL_FIELD_CREATED,
  DETAIL_FIELD_READ,
  DETAIL_FIELD_UPDATED,
  DETAIL_FIELD_REMOVED,
  UpdateDetailFieldDto,
  CreateDetailFieldDto,
  DetailFieldIdDto,
} from '@sephrmicroservice-monorepo/common';
@Controller('admin/detail-field')
export class DetailFieldMicroserviceController {
  constructor(private readonly detailFieldService: DetailFieldService) {}
  @MessagePattern(DETAIL_FIELD_READ)
  async find() {
    return await this.detailFieldService.read();
  }

  @MessagePattern(DETAIL_FIELD_CREATED)
  async create(@Payload() createDetailFieldDto: CreateDetailFieldDto) {
    return await this.detailFieldService.add(createDetailFieldDto);
  }

  @MessagePattern(DETAIL_FIELD_UPDATED)
  async update(@Payload() updateDetailFieldDto: UpdateDetailFieldDto) {
    return await this.detailFieldService.modify(updateDetailFieldDto);
  }

  @MessagePattern(DETAIL_FIELD_REMOVED)
  async delete(@Payload() detailFieldIdDto: DetailFieldIdDto) {
    return await this.detailFieldService.remove(detailFieldIdDto);
  }
}
