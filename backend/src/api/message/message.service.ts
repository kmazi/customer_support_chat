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
        message.customerId = data.customerId;
        message.conversationId = data.conversationId;
        if (data.agentId) {
            message.agentId = data.agentId;
        }
        return this.messageRepository.save(message);
    }

    public getCustomerMessages(customerId: number): Promise<Message[]> {
        const messages: Promise<Message[]> = this.messageRepository.query(
            `WITH m AS (SELECT * FROM message
                WHERE "customerId" = $1
                ORDER BY id DESC
                Limit 20)
                SELECT * FROM m
                ORDER BY id`, [customerId]
        );
        return messages;
    }
}
