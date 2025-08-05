import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt,  Strategy} from "passport-jwt";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService : UserService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey : 'secret'
        })
    }

    async validate(payload: any) {
        try{
            const user = await this.userService.getCurrentUser(payload.id);
            if(!user){
                throw new UnauthorizedException('User not found');
            }
            return {
                ...user,
                role : payload.role
            }
        }catch(e){
            void e;
            throw new UnauthorizedException('Invalid token');
        }
    }
}