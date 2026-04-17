import { GetMetadataI } from "../../common/response.interface";
import { Loan } from "./loan.entity";
import {LoanStatus} from "./loan.interfaces";

export interface ILoanRepository {
    create(loan: Loan): Promise<Loan>;
    updateStatus(customerId: string, loanId: string, status: LoanStatus): Promise<Loan | null>;
    findById(loanId: string): Promise<Loan | null>;
    findAll(page: number, limit: number, status?: LoanStatus): Promise<{ loans: Loan[], metadata: GetMetadataI }>;
}