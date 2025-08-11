import { IsNotEmpty, IsString } from "class-validator";

export class LogoutDTO{
    @IsNotEmpty({message: 'id is required'})
    id: string;

    @IsNotEmpty({message: 'token is required'})
    token : string;
}