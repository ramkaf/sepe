import { Injectable } from '@nestjs/common';
import { CreateDetailFieldDto } from './dto/create-detail-field.dto';
import { UpdateDetailFieldDto } from './dto/update-detail-field.dto';

@Injectable()
export class DetailFieldService {
  create(createDetailFieldDto: CreateDetailFieldDto) {
    return 'This action adds a new detailField';
  }

  findAll() {
    return `This action returns all detailField`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detailField`;
  }

  update(id: number, updateDetailFieldDto: UpdateDetailFieldDto) {
    return `This action updates a #${id} detailField`;
  }

  remove(id: number) {
    return `This action removes a #${id} detailField`;
  }
}
