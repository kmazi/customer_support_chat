import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    public getUser(id: number|null = null): Promise<User> {
        return this.userRepository.findOneBy({ id });
    }

    public getLoginUser(data: LoginUserDto): Promise<User> {
        return this.userRepository.findOne({ relations: { role: true}, where: { name: data.name, phone: data.phone } });
    }

    public getUsers(): Promise<User[]> {
        return this.userRepository.find({ relations: { role: true } })
    }

    public createUser(data: CreateUserDto): Promise<User> {
        const user: User = new User();
        user.name = data.name;
        user.phone = data.phone;
        user.roleId = data.roleId;
        return this.userRepository.save(user);
    }
}
