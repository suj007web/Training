import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDTO{
    @IsNotEmpty({message: 'Username is required'})
    @IsString({message: 'Username must be a string'})
    @MinLength(3, {message: 'Username must be at least 3 characters long'})
    @MaxLength(20, {message: 'Username must not exceed 20 characters'})
    username: string;

    @IsEmail({}, {message: 'Invalid email format'})
    @IsNotEmpty({message: 'Email is required'})
    @IsString({message: 'Email must be a string'})
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    @IsString({message: 'Password must be a string'})
    @MinLength(6, {message: 'Password must be at least 6 characters long'})
    @MaxLength(50, {message: 'Password must not exceed 50 characters'})
    password: string;


}