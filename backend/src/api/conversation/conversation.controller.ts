import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateConversationDto } from './conversation.dto';
import { Conversation } from './conversation.entity';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
    @Inject(ConversationService)
    private readonly service: ConversationService;

    @Get()
    public getConversations(): Promise<Conversation[]> {
        return this.service.getConversations();
    }

    @Post()
    public createConversation(@Body() data: CreateConversationDto): Promise<Conversation> {
        return this.service.createConversation(data)
    }
}
