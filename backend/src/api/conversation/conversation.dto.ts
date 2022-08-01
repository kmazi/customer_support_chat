import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from '../user/user.entity';

export class CreateConversationDto {
    @IsString()
    @IsNotEmpty()
    public subject: string;

    @IsBoolean()
    public closed: boolean;

    @IsNumber()
    @IsNotEmpty()
    public userId: number

}