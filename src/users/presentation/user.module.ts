import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./user.controller";
import { MongodbUserRepository } from "../infrastructure/mongo/mongodb-user.repository";
import { BcryptPasswordHasher } from "../infrastructure/services/bcrypt-password-hasher";
import { CreateUserUseCase } from "../application/use-cases/create-user.usecase";
import { UserRepository } from "../domain/user.repository";
import { PasswordHasher } from "../application/services/password-hasher";
import { UpdateUserUseCase } from "../application/use-cases/update-user.usecase";
import { User as UserDocument, UserSchema as UserSchemaFactory } from "../infrastructure/mongo/schemas/user.schema";
import {GetUsersUseCase} from "../application/use-cases/get-users.usecase";
import {RedisCacheService} from "../../common/cache/redis-cache.service";
import {CacheRepository} from "../../common/cache/cache.repository";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: UserDocument.name, schema: UserSchemaFactory },
        ]),
    ],
    exports: [MongodbUserRepository],
    controllers: [UserController],
    providers: [
        MongodbUserRepository,
        {
            provide: "USER_REPOSITORY",
            useClass: MongodbUserRepository,
        },
        {
            provide: "CACHE_REPOSITORY",
            useClass: RedisCacheService,
        },
        {
            provide: "PASSWORD_HASHER",
            useClass: BcryptPasswordHasher
        },
        {
            provide: CreateUserUseCase,
            useFactory: (userRepository: UserRepository, passwordHasher: PasswordHasher) => new CreateUserUseCase(userRepository, passwordHasher),
            inject: ["USER_REPOSITORY", "PASSWORD_HASHER"]
        },
        {
            provide: UpdateUserUseCase,
            useFactory: (userRepository: UserRepository) => new UpdateUserUseCase(userRepository),
            inject: ["USER_REPOSITORY"]
        },
        {
            provide: GetUsersUseCase,
            useFactory: (userRepository: UserRepository, cacheRepository: CacheRepository) => new GetUsersUseCase(userRepository, cacheRepository),
            inject: ["USER_REPOSITORY", "CACHE_REPOSITORY"]
        }
    ],
})
export class UserModule {}