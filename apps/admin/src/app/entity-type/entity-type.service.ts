import { Injectable } from '@nestjs/common';
import { CreateEntityTypeDto } from './dto/create-entity-type.dto';
import { UpdateEntityTypeDto } from './dto/update-entity-type.dto';

@Injectable()
export class EntityTypeService {
  create(createEntityTypeDto: CreateEntityTypeDto) {
    return 'This action adds a new entityType';
  }

  findAll() {
    return `This action returns all entityType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} entityType`;
  }

  update(id: number, updateEntityTypeDto: UpdateEntityTypeDto) {
    return `This action updates a #${id} entityType`;
  }

  remove(id: number) {
    return `This action removes a #${id} entityType`;
  }
}
