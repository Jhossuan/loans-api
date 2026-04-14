import {MongodbUserRepository} from "../../../users/infrastructure/mongo/mongodb-user.repository";
import {ILoanUserRepository} from "../../domain/loan-user.repository";
import {Injectable} from "@nestjs/common";

@Injectable()
export class LoanUserAdapter implements ILoanUserRepository {

    constructor(private readonly userRepository: MongodbUserRepository) {}

    async exists(userId: string): Promise<boolean> {
        const user = await this.userRepository.findById(userId);
        return !!user;
    }

}