import { IsNotEmpty, IsString } from "class-validator";

export class LoginDTO{
    @IsNotEmpty({message: 'Username is required'})
    @IsString({message: 'Username must be a string'})
    username: string;

    @IsNotEmpty({message: 'Password is required'})
    password: string;
}