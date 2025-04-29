import { Injectable } from '@nestjs/common';
import { CreateChartEntityDto } from './dto/create-chart-entity.dto';
import { UpdateChartEntityDto } from './dto/update-chart-entity.dto';

@Injectable()
export class ChartEntityService {
  create(createChartEntityDto: CreateChartEntityDto) {
    return 'This action adds a new chartEntity';
  }

  findAll() {
    return `This action returns all chartEntity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chartEntity`;
  }

  update(id: number, updateChartEntityDto: UpdateChartEntityDto) {
    return `This action updates a #${id} chartEntity`;
  }

  remove(id: number) {
    return `This action removes a #${id} chartEntity`;
  }
}
