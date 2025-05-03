import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateEntityDto,
  EntityModel,
  UpdateEntityDto,
} from '@sephrmicroservice-monorepo/common';
import { Entity, Repository } from 'typeorm';

@Injectable()
export class EntityService {}
