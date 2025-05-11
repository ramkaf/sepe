import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ADMIN_RABBITMQ_SERVICE,
  CreateSourceDto,
  IdDTO,
  PlantIdDto,
  SOURCE_CREATED,
  SOURCE_READ,
  SOURCE_REMOVED,
  SOURCE_UPDATED,
  updateSourceDto,
} from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('admin/init-plant/sources')
export class SourceController {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  @Post()
  async createSource(@Body() createSourceDto: CreateSourceDto) {
    const result = this.rabbitClient.send(SOURCE_CREATED, createSourceDto);
    return firstValueFrom(result);
  }

  @Get()
  async readSources(@Query() plantIdDto: PlantIdDto) {
    const result = this.rabbitClient.send(SOURCE_READ, plantIdDto);
    return firstValueFrom(result);
  }

  @Patch()
  async updateSource(@Body() updateSourceDto: updateSourceDto) {
    const result = this.rabbitClient.send(SOURCE_UPDATED, updateSourceDto);
    return firstValueFrom(result);
  }

  @Delete()
  async removeSource(@Query() idDTO: IdDTO) {
    const result = this.rabbitClient.send(SOURCE_REMOVED, idDTO);
    return firstValueFrom(result);
  }
}
