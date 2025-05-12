import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import {
  ADMIN_RABBITMQ_SERVICE,

} from '@sephrmicroservice-monorepo/common';
import { firstValueFrom } from 'rxjs';

@Controller('/xxx')
export class addController {
  constructor(
    @Inject(ADMIN_RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy
  ) {}

  @Get()
  async getDevicesWithSources() {
    const result = this.rabbitClient.send('ramin', {});
    return firstValueFrom(result);
  }
}
