import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';
import { User, UserDocument, UserRole } from 'src/domains/user/user.entity';
import { LoginDTO } from './dto/login.dto';
import type { PasswordService } from 'src/domains/common/password.service';
import { PASSWORD_SERVICE } from 'src/domains/common/password.token';
import { JwtService } from '@nestjs/jwt';
import { USER_REPOSITORY } from 'src/infrastructure/database/repository.token';
import { MongoRepository } from 'src/infrastructure/mongodb/mongo.repository';

@Injectable()
export class UserService {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository : MongoRepository<User>,
        @Inject(PASSWORD_SERVICE)
        private readonly passwordService: PasswordService,
        private readonly jwtService : JwtService
    ){}


    async createUser(registerDto : RegisterDTO) : Promise<Partial<User>>{
        const hashedPassword = await this.passwordService.hashPassword(registerDto.password);
        const user : User = {
            username: registerDto.username,
            email: registerDto.email,
            password: hashedPassword,
            role: UserRole.USER
        }
        const existingUser = await this.userRepository.findByData({
            username : user.username,
            email : user.email
        })
        if(existingUser){
            throw new ConflictException('User with this username or email already exists');
        }
        const newUser = this.userRepository.create(user);
        const { password, ...userWithoutPassword } = await newUser;
        return userWithoutPassword;
    }

    async createAdmin(registerDto: RegisterDTO): Promise<{ message: string } & Partial<User>> {
        const hashedPassword = await this.passwordService.hashPassword(registerDto.password);
        const user: User = {
            username: registerDto.username,
            email: registerDto.email,
            password: hashedPassword,
            role: UserRole.ADMIN
        };
                const existingUser = await this.userRepository.findByData({
            username : user.username,
            email : user.email
        })
        if(existingUser){
            throw new ConflictException('User with this username or email already exists');
        }
        const newUser = this.userRepository.create(user);
        const { password, ...userWithoutPassword } = await newUser;
        return {
            message : "Admin created successfully",
            ...userWithoutPassword
        };
    }

    async login(loginDto : LoginDTO)  {
        const username = loginDto.username;
        const user = await this.userRepository.findByData({
            username : username
        })

        if(!user || !(await this.passwordService.verifyPassword(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const tokens = this.generateTokens(user);
        const { password, ...userWithoutPassword } = user;
        void password;
        return {
            ...userWithoutPassword,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken
        };
    }

    private generateTokens(user: User): { accessToken: string; refreshToken: string } {
        const accessToken = this.generateAccessToken(user as UserDocument);
        const refreshToken = this.generateRefreshToken(user as UserDocument);
        return { accessToken, refreshToken };
    }

    private generateAccessToken(user : UserDocument) : string{
        const payload = {
            id : user._id?.toString(),
            email : user.email,
            role : user.role,
            username : user.username
        }

        return this.jwtService.sign(payload, {
            secret : "secret",
            expiresIn : '1h'
        })
    }

    private generateRefreshToken(user : UserDocument) : string{
        const payload = {
            id : user._id?.toString(),
        }

        return this.jwtService.sign(payload, {
            secret : 'refresh-secret',
            expiresIn : '7d'
        })
    }

    async refreshToken(refreshToken : string){
        try{
                const payload = this.jwtService.verify(refreshToken, {
            secret : 'refresh-secret'
        })

        const user = await this.userRepository.findByData({
            _id : payload.id
        });
        if(!user){
            throw new UnauthorizedException('Invalid refresh token');
        }

        const newAccessToken = this.generateAccessToken(user as UserDocument);
        return {
            accessToken : newAccessToken,
            message : "Access token refreshed successfully"
        }
        }catch(e){
            void e;
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async getCurrentUser(userId : string) : Promise<Partial<User>> {

        const user = await this.userRepository.findByData({
            _id :  userId
        })
     
        if(!user){
            throw new UnauthorizedException('User not found');
        }

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

}
