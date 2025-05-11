import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DetailFieldIdDto,
  DetailField,
  UpdateDetailFieldDto,
  CreateDetailFieldDto,
} from '@sephrmicroservice-monorepo/common';
import { Repository } from 'typeorm';

@Injectable()
export class DetailFieldService {
  constructor(
    @InjectRepository(DetailField)
    private readonly detailFieldRepository: Repository<DetailField>
  ) {}

  async add(createDetailFieldDto: CreateDetailFieldDto): Promise<DetailField> {
    const { detailId, chartType, devideBy, oprType, fieldId, unit } =
      createDetailFieldDto;
    const detailField = this.detailFieldRepository.create({
      detailId,
      chartType,
      devideBy,
      oprType,
      fieldId,
      unit,
    });
    return await this.detailFieldRepository.save(detailField);
  }
  async read(): Promise<DetailField[]> {
    const detailField = await this.detailFieldRepository.find();
    return detailField;
  }
  async modify(
    updateDetailFieldDto: UpdateDetailFieldDto
  ): Promise<DetailField> {
    const { dfId } = updateDetailFieldDto;
    const detailField = await this.detailFieldRepository.findOne({
      where: { dfId },
    });
    if (!detailField) {
      throw new Error(`DetailField with detail field id ${dfId} not found`);
    }
    Object.assign(detailField, updateDetailFieldDto);
    return await this.detailFieldRepository.save(detailField);
  }
  async remove(detailFieldIdDto: DetailFieldIdDto): Promise<DetailField> {
    const { dfId } = detailFieldIdDto;
    const detailField = await this.detailFieldRepository.findOne({
      where: { dfId },
    });
    if (!detailField) {
      throw new Error(`DetailField with detail field id ${dfId} not found`);
    }
    return await this.detailFieldRepository.remove(detailField);
  }
}
