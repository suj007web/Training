import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { BaseRepository } from "src/domains/common/base.repository";
import { PasswordResetToken } from "src/domains/reset-token/reset-token.entity";
import { RESET_TOKEN_REPOSITORY } from "src/infrastructure/database/repository.token";
import { UserService } from "../user/user.service";
import { CreateTokenDTO } from "./dto/createToken.dto";
import { ConfirmResetDTO } from "./dto/confirmReset.dto";
import { User } from "src/domains/user/user.entity";

@Injectable()
export class PasswordResetService {
    constructor(
        @Inject(RESET_TOKEN_REPOSITORY)
        private readonly resetTokenRepository: BaseRepository<PasswordResetToken>,
        private readonly userService: UserService,
    ) { }

    async createToken(createTokenDto : CreateTokenDTO) : Promise<PasswordResetToken>{
        const {token, email} = createTokenDto;
        if(!token || !email){
            throw new BadRequestException('Token and email are required');
        }
        console.log('Creating password reset token for email:', email);
        console.log('Token:', token);
        const existingToken = await this.resetTokenRepository.findByData({
            token
        })
        console.log('Existing token:', existingToken);
        if(existingToken){
            throw new BadRequestException('Token already exists for this email');
        }

        const newToken = await this.resetTokenRepository.create({
            token,
            email,
            used: false,
            expiresAt: new Date(Date.now() + 15 * 60 * 1000) 
        });

        return newToken;
    }

    async validateRequest(confirmResetDto : ConfirmResetDTO) : Promise<Partial<User>>{
        const  {token} = confirmResetDto;

        if(!token){
            throw new BadRequestException('Token is required');
        }

        const existingToken = await this.resetTokenRepository.findByData({
            token
        });

        if(!existingToken){
            throw new BadRequestException('Invalid token');
        }

        if(existingToken.used){
            throw new BadRequestException('Token has already been used');
        }

        if(existingToken.expiresAt < new Date()){
            throw new BadRequestException('Token has expired');
        }
        const userId = await this.userService.getIdByEmail(existingToken.email);
        const updatedUser = await this.userService.editUser(userId, {
            password: confirmResetDto.password
        })

        await this.resetTokenRepository.update(existingToken._id as string, { used: true });

        return updatedUser;
    }
}