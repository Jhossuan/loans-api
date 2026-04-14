import {ILoanRepository} from "../../domain/loan.repository";
import {Loan} from "../../domain/loan.entity";
import {InjectModel} from "@nestjs/mongoose/dist";
import {Loan as LoanSchema} from "./schemas/loan.schema";
import {Model} from "mongoose";

export class MongoDbLoanRepository implements ILoanRepository {
    constructor(
        @InjectModel(LoanSchema.name) private loanModel: Model<LoanSchema>,
    ) {}
    
    async create(loan: Loan): Promise<Loan> {

        const newLoan = new this.loanModel(loan)
        await newLoan.save();

        return Loan.create({
            userId: newLoan.userId,
            customerId: newLoan.customerId,
            amount: newLoan.amount,
            interest: newLoan.interest,
            paymentDate: newLoan.paymentDate,
        })
    }
}