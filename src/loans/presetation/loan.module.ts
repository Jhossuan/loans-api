import {Module} from "@nestjs/common";
import {InterestStrategyFactory} from "../infrastructure/factories/interest-strategy.factory";
import {CreateLoanUseCase} from "../application/use-cases/create-loan.usecase";
import {ILoanInterestFactory} from "../domain/strategies/loan-interest.factory";
import {ILoanRepository} from "../domain/loan.repository";
import {ILoanUserRepository} from "../domain/loan-user.repository";
import {MongoDbLoanRepository} from "../infrastructure/mongo/mongodb-loan.repository";
import {LoanUserAdapter} from "../infrastructure/adapters/loan-user.adapter";
import {MongooseModule} from "@nestjs/mongoose";
import {Loan as LoanDocument, LoanSchema as LoanSchemaFactory} from "../infrastructure/mongo/schemas/loan.schema";
import {LoanController} from "./loan.controller";
import {UserModule} from "../../users/presentation/user.module";
import {FixedInterestStrategy} from "../infrastructure/strategies/fixed-interest.strategy";
import {DynamicInterestStrategy} from "../infrastructure/strategies/dynamic-interest.strategy";
import {GetLoansUseCase} from "../application/use-cases/get-loans.usecase";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: LoanDocument.name, schema: LoanSchemaFactory },
        ]),
        UserModule,
    ],
    controllers: [LoanController],
    providers: [
        FixedInterestStrategy,
        DynamicInterestStrategy,
        {
            provide: "LOAN_INTEREST_STRATEGY",
            useClass: InterestStrategyFactory
        },
        {
            provide: "LOAN_REPOSITORY",
            useClass: MongoDbLoanRepository
        },
        {
            provide: "LOAN_USER_REPOSITORY",
            useClass: LoanUserAdapter
        },
        {
            provide: CreateLoanUseCase,
            useFactory: (
                loanInterestFactory: ILoanInterestFactory,
                loanRepository: ILoanRepository,
                userLoanRepository: ILoanUserRepository
            ) => new CreateLoanUseCase(loanInterestFactory, loanRepository, userLoanRepository),
            inject: ["LOAN_INTEREST_STRATEGY", "LOAN_REPOSITORY", "LOAN_USER_REPOSITORY"],
        },
        {
            provide: GetLoansUseCase,
            useFactory: (
                loanRepository: ILoanRepository,
            ) => new GetLoansUseCase(loanRepository),
            inject: ["LOAN_REPOSITORY"]
        }
    ],
})
export class LoansModule {}