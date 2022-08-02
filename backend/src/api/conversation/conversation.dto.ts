import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

export class CreateConversationDto {
    @IsString()
    @IsNotEmpty()
    public subject: string;

    @IsBoolean()
    @IsOptional()
    public closed: boolean;

    @IsNumber()
    @IsOptional()
    public agentId: number

    @IsNumber()
    public customerId: number

}