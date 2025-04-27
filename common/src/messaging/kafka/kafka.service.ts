// libs/common/src/messaging/kafka/kafka.service.ts
import { Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  createKafkaClient(clientId: string, groupId: string): ClientKafka {
    return ClientProxyFactory.create({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId,
          brokers: ['kafka:9092'],
        },
        consumer: {
          groupId,
        },
      },
    }) as ClientKafka;
  }
}