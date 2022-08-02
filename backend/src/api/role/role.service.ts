import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>;

    // Get all roles from database
    public getRoles(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    // Create roles
    public createRole(data: CreateRoleDto): Promise<Role> {
        const role: Role = new Role();
        role.name = data.name;
        return this.roleRepository.save(role);
    }
}
