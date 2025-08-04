import { Injectable } from '@nestjs/common';
import type { UserRepository } from 'src/domains/user/user.repository';
import { RegisterDTO } from './dto/register.dto';
import { User } from 'src/domains/user/user.entity';

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository : UserRepository
    ){}


    async createUser(registerDto : RegisterDTO) : Promise<Partial<User>>{
        const user = new User(
            registerDto.username,
            registerDto.email,
            registerDto.password,
            registerDto.role = registerDto.role || UserRole.USER
        );
    }

}
