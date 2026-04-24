import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {envs} from "../../config/envs";
import {JwtTokenService} from "./jwt-token.service";
import {TOKEN_AUTH_REPOSITORY} from "./constants";
import {AuthGuard} from "./guards/auth.guard";

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: envs.jwtSecretKey,
            signOptions: { expiresIn: "1h" }
        })
    ],
    providers: [
        {
            provide: TOKEN_AUTH_REPOSITORY,
            useClass: JwtTokenService
        },
        AuthGuard
    ],
    exports: [TOKEN_AUTH_REPOSITORY]
})

export class AuthModule {}