import {ILoanRepository} from "../../domain/loan.repository";
import {Loan} from "../../domain/loan.entity";
import {InjectModel} from "@nestjs/mongoose/dist";
import {Loan as LoanSchema} from "./schemas/loan.schema";
import {Model} from "mongoose";
import {LoanAmount} from "../../domain/value-objects/loan-amount";

export class MongoDbLoanRepository implements ILoanRepository {
    constructor(
        @InjectModel(LoanSchema.name) private loanModel: Model<LoanSchema>,
    ) {}
    
    async create(loan: Loan): Promise<Loan> {

        const newLoan = new this.loanModel({
            userId: loan.userId,
            customerId: loan.customerId,
            amount: loan.getAmount(),
            interest: loan.interest,
            paymentDate: loan.paymentDate,
        })
        await newLoan.save();

        return Loan.create({
            userId: newLoan.userId,
            customerId: newLoan.customerId,
            amount: LoanAmount.create(newLoan.amount),
            interest: newLoan.interest,
            paymentDate: newLoan.paymentDate,
        })
    }
}