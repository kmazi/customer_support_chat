import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    @Length(14, 15)
    public phone: string;
}

export class CreateUserDto extends LoginUserDto {
    @IsNotEmpty()
    @IsNumber()
    public roleId: number;

}
