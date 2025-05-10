import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChartDetail, ChartDetailIdDto, ChartIdDto, CreateChartDetailDto, UpdateChartDetailDto } from '@sephrmicroservice-monorepo/common';
import { Repository } from 'typeorm';

@Injectable()
export class ChartDetailService {

      constructor(
        @InjectRepository(ChartDetail) private readonly chartDetailRepository: Repository<ChartDetail>
      ) {}
    
      async add(createChartDetailDto: CreateChartDetailDto): Promise<ChartDetail> {
        const {chartId , detailDes , detailTitle , etId} = createChartDetailDto
        createChartDetailDto;
        const chart = this.chartDetailRepository.create({
            chartId , detailDes , detailTitle , etId
        });
        return await this.chartDetailRepository.save(chart);
      }
      async read(chartIdDto: ChartIdDto): Promise<ChartDetail[]> {
        const { chartId } = chartIdDto;
        const charts = await this.chartDetailRepository.find({ where: { chartId } });
        return charts;
      }
      async modify(updateChartDetailDto: UpdateChartDetailDto): Promise<ChartDetail> {
        const { detailId } =
          updateChartDetailDto;
        const chartDetail = await this.chartDetailRepository.findOne({ where: { detailId } });
        if (!chartDetail) {
          throw new Error(`Chart Detail with detail id ${detailId} not found`);
        }
        Object.assign(chartDetail, updateChartDetailDto);
        return await this.chartDetailRepository.save(chartDetail);
      }
      async remove(chartDetailDto: ChartDetailIdDto): Promise<ChartDetail> {
        const { detailId } = chartDetailDto;
        const chartDetail = await this.chartDetailRepository.findOne({ where: { detailId } });
        if (!chartDetail) {
          throw new Error(`Chart Detail with detail id ${detailId} not found`);
        }
        return await this.chartDetailRepository.remove(chartDetail);
      }
}
