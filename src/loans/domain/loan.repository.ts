import { GetMetadataI } from "../../common/response.interface";
import { Loan } from "./loan.entity";
import {LoanStatus} from "./loan.interfaces";

export interface ILoanRepository {
    create(loan: Loan): Promise<Loan>;
    // updateLoanStatus(userId: string, loanId: string): Promise<void>;
    // findById(id: number): Promise<Loan | null>;
    findAll(page: number, limit: number, status?: LoanStatus): Promise<{ loans: Loan[], metadata: GetMetadataI }>;
    // update(loan: Loan): Promise<Loan>;
    // delete(id: number): Promise<void>;
}