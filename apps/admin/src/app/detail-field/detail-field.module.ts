import { Module } from '@nestjs/common';
import { DetailFieldService } from './detail-field.service';
import { DetailFieldMicroserviceController } from './detail-field.controller';

@Module({
  controllers: [DetailFieldMicroserviceController],
  providers: [DetailFieldService],
})
export class DetailFieldModule {}
