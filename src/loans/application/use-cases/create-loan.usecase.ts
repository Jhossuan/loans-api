import {Loan} from "../../domain/loan.entity";
import {ILoanRepository} from "../../domain/loan.repository";
import {ILoanUserRepository} from "../../domain/loan-user.repository";
import {ILoanInterestFactory, Strategies} from "../../domain/strategies/loan-interest.factory";
import {LoanAmount} from "../../domain/value-objects/loan-amount";
import {AppError} from "../../../common/errors/app-error";

export class CreateLoanUseCase {
    constructor(
        private factory: ILoanInterestFactory,
        private loanRepository: ILoanRepository,
        private userLoanRepository: ILoanUserRepository
    ) {}

    async execute(
        loanId: string,
        userId: string,
        customerId: string,
        amount: number,
        term: number,
        loanType: Strategies,
        paymentDate: string,
    ): Promise<Loan> {
        //1. Search if the user exist
        const userExists = await this.userLoanRepository.exists(userId)
        if(!userExists){
            throw new AppError("User not found");
        }

        //2. Calculate the loan interest
        const strategy = this.factory.getStrategy(loanType)
        const interestRate = strategy.calculate(amount, term)

        //4. Create loan
        const loan = Loan.create({
            loanId,
            userId,
            customerId,
            amount: LoanAmount.create(amount),
            interest: interestRate,
            paymentDate: new Date(paymentDate),
        })

        return await this.loanRepository.create(loan);
    }
}