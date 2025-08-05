import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "src/decorators/role.decorator";
import { UserRole } from "src/domains/user/user.entity";


@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector : Reflector){}

    canActivate(context: ExecutionContext): boolean  {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
            ROLES_KEY,
            [
                context.getHandler(),
                context.getClass()
            ]
        )

        // console.log('Required Roles:', requiredRoles);

        if(!requiredRoles || requiredRoles.length === 0) {
            return true; 
        }

        const {user} = context.switchToHttp().getRequest();
        console.log('---- INSIDE ROLES GUARD ---- Current User:', user.username);
        if(!user){
            throw new ForbiddenException('User not found');
        }

        const hasRequiredRole = requiredRoles.some(role => user.role === role);
        if(!hasRequiredRole) {
            throw new ForbiddenException('You do not have permission to access this resource');
        }
        return true;
    }
}