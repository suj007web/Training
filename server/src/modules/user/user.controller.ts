import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards/jwtauth.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { User, UserRole } from 'src/domains/user/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';

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

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getCurrentUser(@CurrentUser() user) {
        return user;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Put(':id')
    async editUser(@Param('id') id: string, @Body() data: Partial<User>) {
        return this.userService.editUser(id, data);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
