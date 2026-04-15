import { GetMetadataI } from "../../common/response.interface";
import { Loan } from "./loan.entity";

export interface ILoanRepository {
    create(loan: Loan): Promise<Loan>;
    // updateLoanStatus(loan: Loan): Promise<Loan>;
    // findById(id: number): Promise<Loan | null>;
    // findAll(page: number, limit: number): Promise<{ loans: Loan[], metadata: GetMetadataI }>;
    // update(loan: Loan): Promise<Loan>;
    // delete(id: number): Promise<void>;
}