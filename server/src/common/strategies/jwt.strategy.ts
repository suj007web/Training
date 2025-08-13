import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt,  Strategy} from "passport-jwt";
import { UserService } from "src/domains/user/services/";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService : UserService){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey : 'secret',
            passReqToCallback: true
        })
    }
    
    async validate(req: Request, payload: any) {
        console.log('JWT Strategy started');
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    console.log('Extracted token:', token);
    if (!payload?.id || !token) {
      console.log('Invalid token payload or structure');
      throw new UnauthorizedException('Invalid token payload or structure');
    }

    const user = await this.userService.getUserByIdAndToken(payload.id, token);
    console.log('User found:', user);
    if (!user) {
   
      throw new UnauthorizedException('User not found');
    }


    return {
      ...user,
      role: payload.role,
    };
  }
}