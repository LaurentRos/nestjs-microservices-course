import { Module } from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { WorkflowsController } from './workflows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from 'apps/workflows-service/src/workflows/entities/workflow.entity';
import { InboxModule } from 'apps/workflows-service/src/inbox/inbox.module';
import { WorkflowsInboxProcessor } from 'apps/workflows-service/src/workflows/workflows-inbox.processor';

@Module({
  imports: [TypeOrmModule.forFeature([Workflow]), InboxModule],
  controllers: [WorkflowsController],
  providers: [WorkflowsService, WorkflowsInboxProcessor],
})
export class WorkflowsModule {}
