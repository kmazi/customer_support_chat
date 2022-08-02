import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './message.dto';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>;

    public createMessage(data: CreateMessageDto): Promise<Message> {
        const message: Message = new Message();
        message.body = data.body;
        message.senderId = data.senderId;
        message.conversationId = data.conversationId;
        if (data.receiverId) {
            message.receiverId = data.receiverId;
        }
        return this.messageRepository.save(message);
    }
}
