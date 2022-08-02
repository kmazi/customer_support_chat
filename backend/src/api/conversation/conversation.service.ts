import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './conversation.dto';
import { Conversation } from './conversation.entity';

@Injectable()
export class ConversationService {
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>;

    public getConversations(): Promise<Conversation[]> {
        return this.conversationRepository.find({ relations: { customer: true } })
    }

    public createConversation(data: CreateConversationDto): Promise<Conversation> {
        const conversation: Conversation = new Conversation();
        conversation.subject = data.subject;
        conversation.closed = data.closed;
        conversation.customerId = data.customerId;
        conversation.agentId = data.agentId;

        return this.conversationRepository.save(conversation);
    }
}
