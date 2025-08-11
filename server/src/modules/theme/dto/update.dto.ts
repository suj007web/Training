import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDTO{
    @IsNotEmpty({message: 'Theme name is required'})
    @IsString({message: 'Theme name must be a string'})
    name : 'theme1' | 'theme2' | 'theme3';
}