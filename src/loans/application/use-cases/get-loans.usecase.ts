import {ILoanRepository} from "../../domain/loan.repository";
import {Loan} from "../../domain/loan.entity";
import {GetMetadataI} from "../../../common/response.interface";
import {LoanStatus} from "../../domain/loan.interfaces";

export class GetLoansUseCase {
    constructor(
        private readonly loanRepository: ILoanRepository,
    ) {}

    execute(
        page: number,
        limit: number,
        status?: LoanStatus,
    ): Promise<{ loans: Loan[], metadata: GetMetadataI }>{
        return this.loanRepository.findAll(page, limit, status)
    }

}