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
        // return this.userRepository.findOne({ relations: { role: true}, where: { name: data.name, phone: data.phone } });
        return this.userRepository.query(`
            SELECT public.user.*, conversation.*, role.name as role_name
            FROM public.user
            INNER JOIN role
            ON public.user.role_id = role.id
            LEFT JOIN (
                SELECT DISTINCT ON (conversation.customer_id) conversation.customer_id, closed, conversation.id as convId
                FROM conversation
                ORDER BY conversation.customer_id DESC
            ) conversation ON conversation.customer_id = public.user.id
            WHERE public.user.name = $1 AND public.user.phone = $2;
        `, [data.name, data.phone])
    }

    // public getLogin(data: LoginUserDto): Promise<User> {
    //     return this.userRepository.findOne({ relations: { role: true}, where: { name: data.name, phone: data.phone } });
    // }

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
