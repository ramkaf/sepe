import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetailFieldService } from './detail-field.service';
import { CreateDetailFieldDto } from './dto/create-detail-field.dto';
import { UpdateDetailFieldDto } from './dto/update-detail-field.dto';

@Controller('detail-field')
export class DetailFieldController {
  constructor(private readonly detailFieldService: DetailFieldService) {}

  @Post()
  create(@Body() createDetailFieldDto: CreateDetailFieldDto) {
    return this.detailFieldService.create(createDetailFieldDto);
  }

  @Get()
  findAll() {
    return this.detailFieldService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detailFieldService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetailFieldDto: UpdateDetailFieldDto) {
    return this.detailFieldService.update(+id, updateDetailFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailFieldService.remove(+id);
  }
}
