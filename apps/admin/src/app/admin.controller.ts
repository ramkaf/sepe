import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AdminMicroserviceController {

  @EventPattern('ping')
  handlePing(data: any) {
    console.log('Admin received message:', data);
  }
}
