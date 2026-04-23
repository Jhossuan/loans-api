import { User } from "./user.entity";
import { GetMetadataI } from "./user.interfaces";

export interface UserRepository {
    create(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findAll(page: number, limit: number): Promise<{ users: User[], metadata: GetMetadataI }>
    findUserByEmail(email: string): Promise<User | null>;
    update(user: User): Promise<User>;
    delete(id: string): Promise<void>;
}