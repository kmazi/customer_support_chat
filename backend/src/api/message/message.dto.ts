import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    public body: string;

    @IsNumber()
    @IsNotEmpty()
    senderId: number;

    @IsNumber()
    receiverId: number;

    @IsNumber()
    @IsNotEmpty()
    conversationId: number;
}