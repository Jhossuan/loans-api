import { UserRepository } from "../../domain/user.repository";
import { User } from "../../domain/user.entity";
import { PasswordHasher } from "../services/password-hasher";

export class CreateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly passwordHasher: PasswordHasher
    ) {}

    async execute(
        email: string,
        name: string,
        password: string,
    ): Promise<User> {
        const hashedPassword = await this.passwordHasher.hash(password);
        const user = new User("A", email, name, hashedPassword)
        return this.userRepository.create(user);
    }
}