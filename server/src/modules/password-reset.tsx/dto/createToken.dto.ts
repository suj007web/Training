import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateTokenDTO{
    @IsNotEmpty({message: 'Token is required'})
    @IsString({message: 'Token must be a string'})
    token: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Email must be a valid email address'})
    email: string;
}