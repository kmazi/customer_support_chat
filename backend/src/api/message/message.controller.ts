import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateMessageDto } from './message.dto';
import { Message } from './message.entity';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    @Inject(MessageService)
    private readonly service: MessageService;

    @Get("/customer/:cid")
    public getCustomerMessages(@Param("cid", ParseIntPipe) cid: number): Promise<Message[]> {
        return this.service.getCustomerMessages(cid);
    }

    @Post()
    public createMessage(@Body() data: CreateMessageDto): Promise<Message> {
        return this.service.createMessage(data);
    }
}
