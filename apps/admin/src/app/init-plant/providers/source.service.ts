import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateSourceDto,
  EntityModel,
  IdDTO,
  PlantIdDto,
  Source,
  updateSourceDto,
} from '@sephrmicroservice-monorepo/common';
import { Repository } from 'typeorm';

@Injectable()
export class SourceService {
  constructor(
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
    @InjectRepository(EntityModel)
    private readonly entityRepository: Repository<EntityModel>
  ) {}

  async add(createSourceDto: CreateSourceDto): Promise<Source> {
    const { key, plantId, sourceName } = createSourceDto;
    const plant = await this.entityRepository.find({ where: { eId: plantId } });
    if (!plant) throw new BadRequestException('plant id not found');
    const sourceSchema = this.sourceRepository.create({
      key,
      plantId,
      sourceName,
    });
    return await this.sourceRepository.save(sourceSchema);
  }

  async read(plantIdDto: PlantIdDto): Promise<Source[]> {
    const { plantId } = plantIdDto;
    return await this.sourceRepository.find({ where: { plantId } });
  }

  async update(updateSourceDto: updateSourceDto): Promise<Source> {
    const { id, ...rest } = updateSourceDto;
    const source = await this.sourceRepository.findOne({ where: { id } });
    if (!source)
      throw new BadRequestException(
        'There is no source associated with this ID'
      );
    Object.assign(source, updateSourceDto);
    return await this.sourceRepository.save(source);
  }

  async remove(idDTO: IdDTO): Promise<Source> {
    const source = await this.sourceRepository.findOne({
      where: { id: idDTO.id },
    });
    if (!source)
      throw new BadRequestException(
        'There is no source associated with this ID'
      );
    return await this.sourceRepository.remove(source);
  }
}
