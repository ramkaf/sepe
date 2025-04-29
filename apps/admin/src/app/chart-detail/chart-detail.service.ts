import { Injectable } from '@nestjs/common';
import { CreateChartDetailDto } from './dto/create-chart-detail.dto';
import { UpdateChartDetailDto } from './dto/update-chart-detail.dto';

@Injectable()
export class ChartDetailService {
  create(createChartDetailDto: CreateChartDetailDto) {
    return 'This action adds a new chartDetail';
  }

  findAll() {
    return `This action returns all chartDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chartDetail`;
  }

  update(id: number, updateChartDetailDto: UpdateChartDetailDto) {
    return `This action updates a #${id} chartDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} chartDetail`;
  }
}
