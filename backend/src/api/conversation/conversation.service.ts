import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, UpdateResult } from 'typeorm';
import { CreateConversationDto, UpdateConversationDto } from './conversation.dto';
import { Conversation } from './conversation.entity';

@Injectable()
export class ConversationService {
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>;

    public getUnattendedConversations(): Promise<Conversation[]> {
        return this.conversationRepository.find({ 
            where: { agentId: IsNull() },
            relations: { customer: true, agent: true } 
        });
    }

    public getAgentConversations(agentId: number, closed: boolean = false): Promise<Conversation[]> {
        return this.conversationRepository.find({
            where: { agentId, closed }
        });
    }

    public getConversations(): Promise<Conversation[]> {
        return this.conversationRepository.find({ relations: { customer: true, agent: true } });
    }

    public getConversation(id: number): Promise<Conversation> {
        return this.conversationRepository.findOneBy({ id });
    }

    public updateConversation(id: number, data: UpdateConversationDto): Promise<UpdateResult> {
        return this.conversationRepository.update(id, data);
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
