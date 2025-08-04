import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Post('register')
    async register(@Body() registerDto : RegisterDTO){
        return this.userService.createUser(registerDto);
    }

    @Post('login')
    async login(@Body() loginDto : LoginDTO){
        return await this.userService.login(loginDto);
    }
}
