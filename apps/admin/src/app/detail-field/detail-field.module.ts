import { Module } from '@nestjs/common';
import { DetailFieldService } from './detail-field.service';
import { DetailFieldController } from './detail-field.controller';

@Module({
  controllers: [DetailFieldController],
  providers: [DetailFieldService],
})
export class DetailFieldModule {}
