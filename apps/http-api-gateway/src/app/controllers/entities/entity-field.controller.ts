import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('/admin/entity-field')
export class EntityFieldController {}
