import { LoanStatus } from "./loan.interfaces";
import {LoanAmount} from "./value-objects/loan-amount";

export class Loan {
    private constructor(
        public loanId: string,
        public userId: string,
        public customerId: string,
        public amount: LoanAmount,
        public interest: number,
        public term: number,
        public paymentDate: Date,
        private status: LoanStatus,
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date,
    ) {
        this.createdAt = new Date()
        this.updatedAt = new Date()
    }

    // static -> Loan.create is a class member
    public static create(props: {
        loanId: string,
        userId: string,
        customerId: string,
        amount: LoanAmount,
        interest: number,
        term: number,
        paymentDate: Date,
    }): Loan {

        return new Loan(
            props.loanId,
            props.userId,
            props.customerId,
            props.amount,
            props.interest,
            props.term,
            props.paymentDate,
            LoanStatus.PENDING,
        )
    }

    public static getLoan(props: {
        loanId: string,
        userId: string,
        customerId: string,
        amount: LoanAmount,
        interest: number,
        term: number,
        status: LoanStatus,
        paymentDate: Date,
        createdAt?: Date,
        updatedAt?: Date,
    }){
        return new Loan(
            props.loanId,
            props.userId,
            props.customerId,
            props.amount,
            props.interest,
            props.term,
            props.paymentDate,
            props.status,
            props.createdAt,
            props.updatedAt,
        )
    }

    // without static is like loan.getAmount() -> is an instance member
    public getAmount(): number {
        return this.amount.getValue();
    }

    public getStatus(): LoanStatus {
        return this.status;
    }

}