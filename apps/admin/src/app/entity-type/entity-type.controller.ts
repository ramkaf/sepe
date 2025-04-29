import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EntityTypeService } from './entity-type.service';
import { CreateEntityTypeDto } from './dto/create-entity-type.dto';
import { UpdateEntityTypeDto } from './dto/update-entity-type.dto';

@Controller('entity-type')
export class EntityTypeController {
  constructor(private readonly entityTypeService: EntityTypeService) {}

  @Post()
  create(@Body() createEntityTypeDto: CreateEntityTypeDto) {
    return this.entityTypeService.create(createEntityTypeDto);
  }

  @Get()
  findAll() {
    return this.entityTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entityTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntityTypeDto: UpdateEntityTypeDto) {
    return this.entityTypeService.update(+id, updateEntityTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entityTypeService.remove(+id);
  }
}
