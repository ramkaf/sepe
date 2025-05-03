import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RABBITMQ_SERVICE } from '@sephrmicroservice-monorepo/common';

@Controller()
export class AppController {
    constructor(@Inject(RABBITMQ_SERVICE) private client: ClientProxy) {}

    @Get('ping')
    async ping() {
      this.client.emit('ping', { msg: 'Hello from Gateway!' });
      return { status: 'sent' };
    }
}
