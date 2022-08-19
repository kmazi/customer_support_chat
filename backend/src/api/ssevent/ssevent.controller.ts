import { Controller, Inject, MessageEvent, Sse } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SseventService } from './ssevent.service';

@Controller('ssevent')
export class SseventController {
  @Inject(SseventService)
  private readonly service: SseventService;

  @Sse('conversation/unattended')
  public getIncomingConversations(): Observable<MessageEvent> {
    return this.service.sendEvents();
  }
}
