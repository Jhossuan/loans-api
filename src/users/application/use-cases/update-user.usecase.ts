import { UserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';

export class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepository){}

    async execute(
        userId: string,
        data: {
            email?: string;
            name?: string;
        }
    ): Promise<User> {
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error('User not found');
        user.email = data.email || user.email;
        user.name = data.name || user.name;
        return this.userRepository.update(user);
    }
}