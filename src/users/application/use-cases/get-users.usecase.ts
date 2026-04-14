import {UserRepository} from "../../domain/user.repository";
import {User} from "../../domain/user.entity";
import {GetMetadataI} from "../../domain/user.interfaces";

export class GetUsersUseCase {

    constructor(
        private readonly userRepository: UserRepository,
    ){}

    async execute(
        page: number,
        limit: number,
    ): Promise<{ users: User[], metadata: GetMetadataI }>{
        return this.userRepository.findAll(page, limit)
    }

}