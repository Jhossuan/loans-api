import {Loan} from "../../domain/loan.entity";
import {ILoanRepository} from "../../domain/loan.repository";
import {ILoanUserRepository} from "../../domain/loan-user.repository";
import {ILoanInterestFactory, Strategies} from "../../domain/strategies/loan-interest.factory";
import {LoanAmount} from "../../domain/value-objects/loan-amount";

export class CreateLoanUseCase {
    constructor(
        private factory: ILoanInterestFactory,
        private loanRepository: ILoanRepository,
        private userLoanRepository: ILoanUserRepository
    ) {}

    async execute(
        userId: string,
        customerId: string,
        amount: number,
        term: number,
        loanType: Strategies,
    ): Promise<Loan> {
        //1. Search if the user exist
        const userExists = await this.userLoanRepository.exists(userId)
        if(!userExists){
            throw new Error("User not found");
        }

        //2. Calculate the loan interest
        const strategy = this.factory.getStrategy(loanType)
        const interestRate = strategy.calculate(amount, term)

        //4. Create loan
        const loan = Loan.create({
            userId,
            customerId,
            amount: LoanAmount.create(amount),
            interest: interestRate,
            paymentDate: new Date(),
        })

        return await this.loanRepository.create(loan);
    }
}