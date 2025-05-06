import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Chart,
  ChartIdDto,
  CreateChartDto,
  PlantIdDto,
  UpdateChartDto,
} from '@sephrmicroservice-monorepo/common';
import { Repository } from 'typeorm';

@Injectable()
export class ChartService {
  constructor(
    @InjectRepository(Chart) private readonly chartRepository: Repository<Chart>
  ) {}

  async add(createChartDto: CreateChartDto): Promise<Chart> {
    const { chartTitle, chartDes, timeGroup, timeGroupType, plantId } =
      createChartDto;
    const chart = this.chartRepository.create({
      chartTitle,
      chartDes,
      timeGroup,
      timeGroupType,
      plantId,
    });
    return await this.chartRepository.save(chart);
  }
  async read(plantIdDto: PlantIdDto): Promise<Chart[]> {
    const { plantId } = plantIdDto;
    const charts = await this.chartRepository.find({ where: { plantId } });
    return charts;
  }
  async modify(updateChartDto: UpdateChartDto): Promise<Chart> {
    const { chartId, chartTitle, chartDes, timeGroup, timeGroupType, plantId } =
      updateChartDto;
    const chart = await this.chartRepository.findOne({ where: { chartId } });
    if (!chart) {
      throw new Error(`Entity with eId ${chartId} not found`);
    }
    Object.assign(chart, updateChartDto);
    return await this.chartRepository.save(chart);
  }
  async remove(chartIdDto: ChartIdDto): Promise<Chart> {
    const { chartId } = chartIdDto;
    const chart = await this.chartRepository.findOne({ where: { chartId } });
    if (!chart) {
      throw new Error(`Entity with eId ${chartId} not found`);
    }
    return await this.chartRepository.remove(chart);
  }
}
