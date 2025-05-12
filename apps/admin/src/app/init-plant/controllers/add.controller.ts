import { ConflictException, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BadGatewayRpcError, BadRequestRpcError } from '@sephrmicroservice-monorepo/common';

@Controller()
export class AddMicroserviceController {
  @MessagePattern('ramin')
  async initPlantTag() {
    throw new BadGatewayRpcError('x');
  }
}
