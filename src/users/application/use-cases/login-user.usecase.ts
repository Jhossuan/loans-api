import {UserRepository} from "../../domain/user.repository";
import {PasswordHasher} from "../services/password-hasher";
import {AppError} from "../../../common/errors/app-error";
import {AuthTokenRepository} from "../../../common/auth/auth-token.repository";

export class LoginUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher,
        private readonly authTokenRepository: AuthTokenRepository
    ) {}

    async execute(
        email: string,
        password: string
    ) {

        //1. validate if user exists
        const user = await this.userRepository.findUserByEmail(email)
        if(!user){
            throw new AppError("Invalid credentials", 401)
        }

        //2. decode password
        const hashedPassword = await this.passwordHasher.compare(password, user.password);
        if(!hashedPassword){
            throw new AppError("Invalid credentials", 401)
        }

        //3. return access token
        const token = await this.authTokenRepository.generate({
            sub: user.userId,
            email: user.email,
        })

        return { accessToken: token };
    }

}