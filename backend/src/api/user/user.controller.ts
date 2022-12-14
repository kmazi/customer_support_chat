import { Body, Controller, Get, HttpCode, Inject, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    @Inject(UserService)
    private readonly service: UserService;

    @Get(":id")
    public getUser(@Param("id", ParseIntPipe) id: number): Promise<User> {
        return this.service.getUser(id);
    }

    @Get()
    public getUsers(): Promise<User[]> {
        return this.service.getUsers();
    }

    @Post()
    public createUser(@Body() data: CreateUserDto): Promise<User> {
        return this.service.createUser(data);
    }

    @Post('/login')
    @HttpCode(200)
    public loginUser(@Body() data: LoginUserDto): Promise<User> {
        return this.service.getLoginUser(data);
    }
}
