import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { Inbox } from './entities/inbox.entity';

@Injectable()
export class InboxService {
  constructor(private readonly dataSource: DataSource) {}

  async processInboxMessages(
    process: (messages: Inbox[], manager: EntityManager) => Promise<unknown>,
    options: { take: number },
  ) {
    return this.dataSource.transaction(async (manager) => {
      const inboxRepository = manager.getRepository(Inbox);
      const messages = await inboxRepository.find({
        where: {
          status: 'pending',
        },
        order: {
          createdAt: 'ASC',
        },
        take: options.take,
      });
      await process(messages, manager);
    });
  }
}
