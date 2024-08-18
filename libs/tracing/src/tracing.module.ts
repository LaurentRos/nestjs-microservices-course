import { Module } from '@nestjs/common';
import { TracingService } from './tracing.service';
import { TracingLogger } from '@app/tracing/tracing.logger';

@Module({
  providers: [TracingService, TracingLogger],
  exports: [TracingService, TracingLogger],
})
export class TracingModule {}
