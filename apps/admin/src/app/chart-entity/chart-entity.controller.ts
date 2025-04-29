import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChartEntityService } from './chart-entity.service';
import { CreateChartEntityDto } from './dto/create-chart-entity.dto';
import { UpdateChartEntityDto } from './dto/update-chart-entity.dto';

@Controller('chart-entity')
export class ChartEntityController {
  constructor(private readonly chartEntityService: ChartEntityService) {}

  @Post()
  create(@Body() createChartEntityDto: CreateChartEntityDto) {
    return this.chartEntityService.create(createChartEntityDto);
  }

  @Get()
  findAll() {
    return this.chartEntityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chartEntityService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChartEntityDto: UpdateChartEntityDto) {
    return this.chartEntityService.update(+id, updateChartEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chartEntityService.remove(+id);
  }
}
