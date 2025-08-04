import { Injectable } from '@nestjs/common';
import type { UserRepository } from 'src/domains/user/user.repository';
import { RegisterDTO } from './dto/register.dto';
import { User, UserRole } from 'src/domains/user/user.entity';
import { LoginDTO } from './dto/login.dto';
import type { PasswordService } from 'src/domains/common/password.service';

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository : UserRepository,
        private readonly passwordService: PasswordService
    ){}


    async createUser(registerDto : RegisterDTO) : Promise<Partial<User>>{
        const hashedPassword = await this.passwordService.hashPassword(registerDto.password);
        const user : User = {
            username: registerDto.username,
            email: registerDto.email,
            password: hashedPassword,
            role: UserRole.USER
        }

        return this.userRepository.create(user);
    }

    async login(loginDto : LoginDTO) : Promise<Partial<User> | null> {
        const username = loginDto.username;
        const user = await this.userRepository.findByData({
            username : username
        })

        if(!user || !(await this.passwordService.verifyPassword(loginDto.password, user.password))) {
            return null; 
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }


}
