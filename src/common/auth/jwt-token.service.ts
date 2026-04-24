import {AuthTokenRepository} from "./auth-token.repository";
import {JwtService} from "@nestjs/jwt";
import {Injectable} from "@nestjs/common";

@Injectable()
export class JwtTokenService implements AuthTokenRepository {
    constructor(
        private readonly jwtService: JwtService
    ) {}

    async generate(payload: any): Promise<string> {
        return this.jwtService.signAsync(payload);
    }

    async verify(token: string): Promise<any> {
        return this.jwtService.verifyAsync(token);
    }

}