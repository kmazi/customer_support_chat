import { BadRequestException, Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateMessageDto } from './message.dto';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    @Inject(MessageService)
    private readonly service: MessageService;

    @Get("/customer/:cId")
    public getCustomerMessages(@Param("cId", ParseIntPipe) cId: number): Promise<Message[]> {
        return this.service.getCustomerMessages(cId);
    }

    @Get("/conversation/:convId")
    public getConversationMessages(@Param("convId", ParseIntPipe) convId: number): Promise<Message[]> {
        return this.service.getConversationMessages(convId)
    }

    @Post()
    public async createMessage(@Body() data: CreateMessageDto): Promise<Message> {
        try {
            const message = await this.service.createMessage(data);
            return message;
        } catch (error: any) {
            if (error instanceof Error) {
                throw new BadRequestException("BadRequest", error.message);
            } else {
                throw new BadRequestException("BadRequest", "An error occurred while saving your message in the storage.");
            }
        }
        
    }
}
