import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards/jwtauth.guard';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { User, UserRole } from 'src/domains/user/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { APIResponse } from 'src/domains/common/response';
import { LogoutDTO } from './dto/logout.dto';
type loginResponse = {
        accessToken: string;
        refreshToken: string;
        user: Partial<User>;
    }

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Get('getId/:id')
    async getIdByEmail(@Param('id') email: string): Promise<APIResponse<string>> {
        try {
            console.log("Fetching user ID for email:", email);
            const id = await this.userService.getIdByEmail(email);
            console.log(id);
            return {
                status: 'success',
                message: 'User ID fetched successfully',
                data: id
            };
        } catch (e) {
            throw new HttpException({
                status: 'error',
                error: e.message
            }, HttpStatus.NOT_FOUND);
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get("all")
    async getAllUsers() : Promise<APIResponse<Partial<User>[]>> {
        try{    
            console.log("hi")
            const users = await this.userService.getAllUsers();
            console.log(users);
            return {
                status: 'success',
                message: "Users fetched successfully",
                data: users
            };
        }catch(e){
           throw new HttpException( {
                status: 'error',
                error: e.message
            },
            HttpStatus.INTERNAL_SERVER_ERROR
        )
        }
    }

        @Get(":id")
    async getUserById(@Param('id') id: string) : Promise<APIResponse<Partial<User>>> {
        try{
            const user = await this.userService.getCurrentUser(id);
            if(!user){
                throw new HttpException({
                    status: 'error',
                    error: 'User not found'
                }, HttpStatus.NOT_FOUND);
            }
            return {
                status: 'success',
                message: "User fetched successfully",
                data: user
            };
        }catch(e){
            throw new HttpException({
                status: 'error',
                error: e.message
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('register')
    async register(@Body() registerDto : RegisterDTO) : Promise<APIResponse<Partial<User>>>{
        try{
            const user = await this.userService.createUser(registerDto);
            return {
                status: 'success',
                message: "User registered successfully",
                data: user
            };
        }catch(e){
            throw new HttpException({
                status: 'error',
                error: e.message
            }, HttpStatus.BAD_REQUEST);
        }

    }

    @Post('login')
    async login(@Body() loginDto : LoginDTO) : Promise<APIResponse<loginResponse>>{
        try{
            const res = await this.userService.login(loginDto);
            return {
                status: 'success',
                message: "Login successful",
                data: res
            };
        }catch(e){
            throw new HttpException({
                status: 'error',
                error: e.message
            }, HttpStatus.UNAUTHORIZED);
        }

    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getCurrentUser(@CurrentUser() user) {
        return user;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Put(':id')
    async editUser(@Param('id') id: string, @Body() data: Partial<User>) : Promise<APIResponse<Partial<User>>> {
       try{
            if(!data.email && !data.password){
                throw new HttpException({
                    status: 'error',
                    error: 'At least one field (email or password) must be provided for update'
                }, HttpStatus.BAD_REQUEST);
            }
            
            const user = await this.userService.editUser(id, data);

            return {
                status: 'success',
                message: 'User updated successfully',
                data: user
            }
       }catch(e){
            throw new HttpException({
                status: 'error',
                error: e.message
            }, HttpStatus.NOT_FOUND);
       }

    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    async deleteUser(@Param('id') id: string) : Promise<APIResponse<void>> {
       try{
         await this.userService.deleteUser(id);
        return {
            status: 'success',
            message: 'User deleted successfully'
        }
       }catch(e){
            throw new HttpException({
                status: 'error',
                error: e.message
            }, HttpStatus.NOT_FOUND);
       }
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Body() logoutDto : LogoutDTO) : Promise<APIResponse<void>> {
        try{
            await this.userService.logout(logoutDto.id, logoutDto.token);
            return {
                status: 'success',
                message: 'User logged out successfully'
            };
        }catch(e){
            throw new HttpException({
                status: 'error',
                error: e.message
            }, HttpStatus.UNAUTHORIZED);
        }

    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post('createAdmin')
    async createAdmin(@Body() registerDto : RegisterDTO) : Promise<APIResponse<Partial<User>>> {

        const user = await this.userService.createAdmin(registerDto);
        return {
            status: 'success',
            message: 'Admin created successfully',
            data: user
        };
    }

   
}
