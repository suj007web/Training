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
            secretOrKey : 'secret',
            passReqToCallback: true
        })
    }

      async validate(req: Request, payload: any) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    
    if (!payload?.id || !token) {
      throw new UnauthorizedException('Invalid token payload or structure');
    }

    const user = await this.userService.getCurrentUser(payload.id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!user.activeTokens?.includes(token)) {
      throw new UnauthorizedException('Token has been revoked');
    }

    return {
      ...user,
      role: payload.role,
    };
  }
}