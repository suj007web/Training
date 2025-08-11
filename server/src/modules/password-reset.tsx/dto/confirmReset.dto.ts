import { IsNotEmpty, IsString } from "class-validator";

export class ConfirmResetDTO {
    @IsNotEmpty({ message: 'Token is required' })
    @IsString({ message: 'Token must be a string' })
    token: string;

    @IsNotEmpty({ message: 'New password is required' })
    @IsString({ message: 'New password must be a string' })
    password: string;

}