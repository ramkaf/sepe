import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('/admin/entity')
export class EntityController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient:ClientKafka
  ) {}

}
