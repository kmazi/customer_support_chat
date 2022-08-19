import { Injectable, MessageEvent } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class SseventService {
    private events = new Subject<MessageEvent>();

    public addEvent(event: MessageEvent) {
        this.events.next(event);
    }

    public sendEvents() {
        return this.events.asObservable();
    }
}
