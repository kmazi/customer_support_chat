import { Module } from '@nestjs/common';
import { SseventService } from './ssevent.service';
import { SseventController } from './ssevent.controller';

@Module({
  controllers: [SseventController],
  providers: [SseventService],
  exports: [SseventService]
})
export class SseventModule {}
