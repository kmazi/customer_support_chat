import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateRoleDto } from './role.dto';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    @Inject(RoleService)
    private readonly service: RoleService;

    @Get()
    public getRoles(): Promise<Role[]> {
        return this.service.getRoles();
    }

    @Post()
    public createUser(@Body() data: CreateRoleDto): Promise<Role> {
        return this.service.createRole(data)
    }
}
