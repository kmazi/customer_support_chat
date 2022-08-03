import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../conversation/conversation.entity';
import { ConversationService } from '../conversation/conversation.service';
import { CreateMessageDto } from './message.dto';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>;
    @Inject(ConversationService)
    private readonly conversationService: ConversationService;

    private async validateMessageConversation(message: Message) {
        const conversation: Promise<Conversation> = this.conversationService.getConversation(message.conversationId);
        await conversation.then((value: Conversation) => {
            // Users shouldn't send messages to closed conversations.
            if (value.closed) {
                throw new Error("This conversation has closed. Please start a new conversation.");
            }
            // If agentId is specified, it should match the agent in charge of the conversation.
            if (message.agentId !== null && message.agentId !== undefined && message.agentId != value.agentId) {
                throw new Error("There is already an agent on the conversation.");
            }

            if (message.customerId != value.customerId) {
                throw new Error("You are not authorized to send messages in this conversation.");
            }

        }).catch((error: Error) => {
            Logger.log(`An error has occurred while saving a message to a conversation id=${message.conversationId} because ${error.message}`);
            throw error;
        });
    }

    public async createMessage(data: CreateMessageDto): Promise<Message> | null {
        const message: Message = new Message();
        message.body = data.body;
        message.customerId = data.customerId;
        message.conversationId = data.conversationId;
        message.agentId = data.agentId;
        // Validate incoming message
        await this.validateMessageConversation(message)

        return this.messageRepository.save(message);
    }

    public getConversationMessages(convId: number) {
        return this.messageRepository.find({
            where: { conversationId: convId }
        });
    }

    public getCustomerMessages(customerId: number): Promise<Message[]> {
        return this.messageRepository.query(
            `WITH m AS (SELECT * FROM message
                WHERE "customerId" = $1
                ORDER BY id DESC
                Limit 20)
                SELECT * FROM m
                ORDER BY id`, [customerId]
        );
    }
}
