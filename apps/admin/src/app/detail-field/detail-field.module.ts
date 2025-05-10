import { Module } from '@nestjs/common';
import { DetailFieldService } from './detail-field.service';
import { DetailFieldMicroserviceController } from './detail-field.controller';
import { ADMIN_RABBITMQ_QUEUE, ADMIN_RABBITMQ_SERVICE, DetailField, RabbitMQModule } from '@sephrmicroservice-monorepo/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
      imports: [
        RabbitMQModule.register([
          { name: ADMIN_RABBITMQ_SERVICE, queue: ADMIN_RABBITMQ_QUEUE },
        ]),
        TypeOrmModule.forFeature([DetailField]),
      ],
  controllers: [DetailFieldMicroserviceController],
  providers: [DetailFieldService],
})
export class DetailFieldModule {}
