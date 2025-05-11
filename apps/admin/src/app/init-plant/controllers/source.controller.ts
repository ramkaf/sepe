import { Controller } from '@nestjs/common';
import { SourceService } from '../providers/source.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateSourceDto,
  IdDTO,
  PlantIdDto,
  SOURCE_CREATED,
  SOURCE_READ,
  SOURCE_REMOVED,
  SOURCE_UPDATED,
  updateSourceDto,
} from '@sephrmicroservice-monorepo/common';

@Controller()
export class SourceController {
  constructor(private readonly sourceService: SourceService) {}

  @MessagePattern(SOURCE_CREATED)
  async createSource(@Payload() createSourceDto: CreateSourceDto) {
    return await this.sourceService.add(createSourceDto);
  }

  @MessagePattern(SOURCE_READ)
  async readPlantSources(@Payload() plantIdDto: PlantIdDto) {
    return await this.sourceService.read(plantIdDto);
  }

  @MessagePattern(SOURCE_UPDATED)
  async updateSource(@Payload() updateSourceDto: updateSourceDto) {
    return await this.sourceService.update(updateSourceDto);
  }

  @MessagePattern(SOURCE_REMOVED)
  async removeSource(@Payload() idDTO: IdDTO) {
    return await this.sourceService.remove(idDTO);
  }
}
