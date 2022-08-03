import { Body, Controller, Get, Inject, Logger, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreateConversationDto, UpdateConversationDto } from './conversation.dto';
import { Conversation } from './conversation.entity';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
    @Inject(ConversationService)
    private readonly service: ConversationService;

    @Get()
    public getConversations(@Query('unattended', ParseBoolPipe) unattended?: boolean): Promise<Conversation[]> {
        if (unattended) {
            return this.service.getUnattendedConversations();
        } else return this.service.getConversations();
    }

    @Get(":id")
    public getConversation(@Param("id", ParseIntPipe) id: number): Promise<Conversation> {
            return this.service.getConversation(id)
    }

    @Get("/agent/:agentId")
    public getAgentConversations(@Param("agentId", ParseIntPipe) agentId: number, 
        @Query("closed", ParseBoolPipe) closed?: boolean): Promise<Conversation[]> {
            return this.service.getAgentConversations(agentId, closed)
    }

    @Patch(":id")
    public patchConversation(@Param("id", ParseIntPipe) id: number, 
        @Body() data: UpdateConversationDto): Promise<UpdateResult> {
            return this.service.updateConversation(id, data)
    }

    @Post()
    public createConversation(@Body() data: CreateConversationDto): Promise<Conversation> {
        return this.service.createConversation(data)
    }
}
