import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ADMIN_RABBITMQ_SERVICE } from '@sephrmicroservice-monorepo/common';

@Injectable()
export class EntityFieldService {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE)
    private readonly rabbitClient: ClientProxy
  ) {}
}
