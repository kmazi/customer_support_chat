import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, UpdateResult } from 'typeorm';
import { SseventService } from '../ssevent/ssevent.service';
import { CreateConversationDto, UpdateConversationDto } from './conversation.dto';
import { Conversation } from './conversation.entity';

@Injectable()
export class ConversationService {
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>;
    @Inject(SseventService)
    private readonly sseventService: SseventService;

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

    public async updateConversation(id: number, data: UpdateConversationDto): Promise<UpdateResult> {
        const updatedConversation = await this.conversationRepository.update(id, data);
        if (!data.closed && data.agentId) this.sseventService.addEvent({data: { id }, type: 'sub'});
        return updatedConversation;
    }

    public async createConversation(data: CreateConversationDto): Promise<Conversation> {
        const conversation: Conversation = new Conversation();
        conversation.subject = data.subject;
        conversation.closed = data.closed;
        conversation.customerId = data.customerId;
        conversation.agentId = data.agentId;

        const createdConversation = await this.conversationRepository.save(conversation);
        this.sseventService.addEvent({data: createdConversation, type: 'add'});
        return createdConversation;
    }
}
