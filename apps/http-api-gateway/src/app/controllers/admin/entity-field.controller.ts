import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('/admin/entity-field')
export class EntityFieldController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient:ClientKafka
  ) {}

}
