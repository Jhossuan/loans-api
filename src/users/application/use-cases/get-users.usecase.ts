import {UserRepository} from "../../domain/user.repository";
import {User} from "../../domain/user.entity";
import {GetMetadataI} from "../../domain/user.interfaces";
import {CacheRepository} from "../../../common/cache/cache.repository";

interface IGetUserResponse { users: User[], metadata: GetMetadataI }

export class GetUsersUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly cacheRepository: CacheRepository,
    ){}

    async execute(
        page: number,
        limit: number,
    ): Promise<IGetUserResponse>{
        const cacheKey = `users:${page}:${limit}`;

        //1. Check cache
        const cached = await this.cacheRepository.get<IGetUserResponse>(cacheKey)
        if(cached) return cached

        //2. Get users
        const result = await this.userRepository.findAll(page, limit)

        //3. Save users in cache (TTL = 5 minutes)
        await this.cacheRepository.set(cacheKey, result, (60*5))
        return result;
    }

}