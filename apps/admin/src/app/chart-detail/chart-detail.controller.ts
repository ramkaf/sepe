import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChartDetailService } from './chart-detail.service';
import { CreateChartDetailDto } from './dto/create-chart-detail.dto';
import { UpdateChartDetailDto } from './dto/update-chart-detail.dto';

@Controller('chart-detail')
export class ChartDetailController {
  constructor(private readonly chartDetailService: ChartDetailService) {}

  @Post()
  create(@Body() createChartDetailDto: CreateChartDetailDto) {
    return this.chartDetailService.create(createChartDetailDto);
  }

  @Get()
  findAll() {
    return this.chartDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chartDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChartDetailDto: UpdateChartDetailDto) {
    return this.chartDetailService.update(+id, updateChartDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartDetailService.remove(+id);
  }
}
