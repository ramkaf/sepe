import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {PlantIdDto} from './../../../../../../common/src'

@Controller('/admin/entity-type')
export class EntityTypeController {
}
