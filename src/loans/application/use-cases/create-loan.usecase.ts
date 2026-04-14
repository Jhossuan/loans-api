import {Loan} from "../../domain/loan.entity";
import {ILoanRepository} from "../../domain/loan.repository";
import {ILoanUserRepository} from "../../domain/loan-user.repository";
import {ILoanInterestFactory, Strategies} from "../../domain/strategies/loan-interest.factory";

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
        console.log('User Exists: ', userExists)
        if(!userExists){
            throw new Error("User not found");
        }

        //2. Calculate the loan interest
        const strategy = this.factory.getStrategy(loanType)
        const interestRate = strategy.calculate(amount, term)
        console.log('Interest Rate: ',interestRate)

        //3. Create loan
        const loan = Loan.create({
            userId,
            customerId,
            amount,
            interest: interestRate,
            paymentDate: new Date(),
        })

        console.log('Loan: ', loan)
        return await this.loanRepository.create(loan);
    }
}