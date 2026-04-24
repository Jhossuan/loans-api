
import {Injectable, CanActivate, ExecutionContext, HttpStatus, Inject} from '@nestjs/common';
import {Request} from 'express'
import {AppError} from "../../errors/app-error";
import {JwtTokenService} from "../jwt-token.service";
import {TOKEN_AUTH_REPOSITORY} from "../constants";
import {envs} from "../../../config/envs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @Inject(TOKEN_AUTH_REPOSITORY)
        private readonly jwtTokenService: JwtTokenService
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        const allowedRoutes = envs.allowedRoutes.split(',')
        const route = request.route.path
        if(allowedRoutes.includes(route)){
            return true;
        }

        if(!token){
            throw new AppError("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        try {
            request['user'] = await this.jwtTokenService.verify(token);
        } catch (error) {
            throw new AppError("Unauthorized", HttpStatus.UNAUTHORIZED);
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
