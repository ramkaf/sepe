import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AdminMicroserviceController {
  constructor(
    
  ) {}

  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order:any){
    console.log(`order service recieved new message` , order);
    
  }
}
