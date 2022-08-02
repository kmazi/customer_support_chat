import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    @Length(14, 15)
    public phone: string;

    @IsNotEmpty()
    @IsNumber()
    public roleId: number;

}