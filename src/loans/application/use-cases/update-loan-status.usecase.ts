import {LoanStatus} from "../../domain/loan.interfaces";
import {ILoanRepository} from "../../domain/loan.repository";
import {ILoanUserRepository} from "../../domain/loan-user.repository";
import {AppError} from "../../../common/errors/app-error";

export class UpdateLoanStatusUseCase {
    constructor(
        private readonly loanRepository: ILoanRepository,
        private readonly loanUserRepository: ILoanUserRepository
    ) {}

    async execute(
        customerId: string,
        loanId: string,
        status: LoanStatus,
    ){
        const customerExist = await this.loanUserRepository.exists(customerId)
        if(!customerExist){
            throw new AppError("Customer not found", 400, customerId);
        }

        const loanExists = await this.loanRepository.findById(loanId);
        if(!loanExists){
            throw new AppError("Loan not found", 400, loanId);
        }

        return this.loanRepository.updateStatus(customerId, loanId, status)
    }
}
