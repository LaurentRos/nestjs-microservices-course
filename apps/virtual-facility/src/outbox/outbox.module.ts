import { Module } from '@nestjs/common';
import { OutboxService } from './outbox.service';
import { Outbox } from 'apps/virtual-facility/src/outbox/entities/outbox.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WORKFLOWS_SERVICE } from 'apps/virtual-facility/src/constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OutboxProcessor } from 'apps/virtual-facility/src/outbox/outbox.processor';
import { OutboxEntitySubscriber } from 'apps/virtual-facility/src/outbox/outbox.entity-subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([Outbox]),
    ClientsModule.register([
      {
        name: WORKFLOWS_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'workflows-service',
        },
      },
    ]),
  ],
  providers: [OutboxService, OutboxProcessor, OutboxEntitySubscriber],
})
export class OutboxModule {}
