import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
    @IsString()
    @IsNotEmpty()
    public body: string;

    @IsNumber()
    @IsNotEmpty()
    customerId: number;

    @IsNumber()
    @IsOptional()
    agentId: number;

    @IsNumber()
    @IsNotEmpty()
    conversationId: number;
}