import {ILoanRepository} from "../../domain/loan.repository";
import {Loan} from "../../domain/loan.entity";
import {InjectModel} from "@nestjs/mongoose/dist";
import {Loan as LoanSchema} from "./schemas/loan.schema";
import {Model} from "mongoose";
import {LoanAmount} from "../../domain/value-objects/loan-amount";
import {GetMetadataI} from "../../../common/response.interface";
import {LoanStatus} from "../../domain/loan.interfaces";
import {InterestTerm} from "../../domain/value-objects/interest-term";

export class MongoDbLoanRepository implements ILoanRepository {
    constructor(
        @InjectModel(LoanSchema.name) private loanModel: Model<LoanSchema>,
    ) {}
    
    async create(loan: Loan): Promise<Loan> {

        const newLoan = new this.loanModel({
            userId: loan.userId,
            customerId: loan.customerId,
            amount: loan.getAmount(),
            interest: loan.getInterest(),
            term: loan.term,
            paymentDate: loan.paymentDate,
        })
        await newLoan.save();

        return Loan.create({
            loanId: newLoan.loanId,
            userId: newLoan.userId,
            customerId: newLoan.customerId,
            amount: LoanAmount.create(newLoan.amount),
            interest: InterestTerm.create(newLoan.interest),
            term: newLoan.term,
            paymentDate: newLoan.paymentDate,
        })
    }

    async updateStatus(customerId: string, loanId: string, status: LoanStatus): Promise<Loan | null> {
        const updatedStatus = await this.loanModel.findOneAndUpdate(
            { loanId: loanId, customerId: customerId },
            { $set: { status: status } },
            { $new: true }
        )

        if(!updatedStatus) return null;

        return Loan.getLoan({
            loanId: updatedStatus.loanId,
            userId: updatedStatus.userId,
            customerId: updatedStatus.customerId,
            amount: LoanAmount.create(updatedStatus.amount),
            interest: InterestTerm.create(updatedStatus.interest),
            term: updatedStatus.term,
            status: updatedStatus.status,
            createdAt: updatedStatus.createdAt,
            updatedAt: updatedStatus.updatedAt,
            paymentDate: updatedStatus.paymentDate,
        })
    }

    async findAll(page: number, limit: number, status?: LoanStatus): Promise<{ loans: Loan[], metadata: GetMetadataI }> {
        const queryMatch:{ $match: { status?: LoanStatus } } = {
            $match: {}
        }

        let totalDocuments;
        if(status){
            queryMatch.$match['status'] = status;
            totalDocuments = await this.loanModel.countDocuments({ status })
        } else {
            totalDocuments = await this.loanModel.countDocuments()
        }

        const loans = await this.loanModel.aggregate([
            {
                ...queryMatch
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ])

        return {
            loans: loans.map((loan) => Loan.getLoan({
                loanId: loan.loanId,
                userId: loan.userId,
                customerId: loan.customerId,
                amount: LoanAmount.create(loan.amount),
                interest: InterestTerm.create(loan.interest),
                term: loan.term,
                status: loan.status,
                createdAt: loan.createdAt,
                updatedAt: loan.updatedAt,
                paymentDate: loan.paymentDate,
            })),
            metadata: {
                currentPage: page,
                lastPage: Math.ceil(totalDocuments / limit),
                totalDocuments: totalDocuments,
            },
        }

    }

    async findById(loanId: string): Promise<Loan | null> {
        const loan = await this.loanModel.findOne({ loanId: loanId });
        if(!loan) return null;

        return Loan.getLoan({
            loanId: loan.loanId,
            userId: loan.userId,
            customerId: loan.customerId,
            amount: LoanAmount.create(loan.amount),
            interest: InterestTerm.create(loan.interest),
            term: loan.term,
            status: loan.status,
            paymentDate: loan.paymentDate,
            createdAt: loan.createdAt,
            updatedAt: loan.updatedAt,
        })
    }

}