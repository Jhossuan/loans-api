import { LoanStatus } from "./loan.interfaces";
import {LoanAmount} from "./value-objects/loan-amount";

export class Loan {
    private constructor(
        public userId: string,
        public customerId: string,
        public amount: LoanAmount,
        public interest: number,
        public paymentDate: Date,
        private status: LoanStatus,
        public loanId?: string,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date(),
    ) {}

    // static -> Loan.create is a class member
    public static create(props: {
        userId: string,
        customerId: string,
        amount: LoanAmount,
        interest: number,
        paymentDate: Date,
    }): Loan {

        return new Loan(
            props.userId,
            props.customerId,
            props.amount,
            props.interest,
            props.paymentDate,
            LoanStatus.PENDING,
        )
    }
    // without static is like loan.getAmount() -> is an instance member
    public getAmount(): number {
        return this.amount.getValue();
    }

    public getStatus(): LoanStatus {
        return this.status;
    }

    public static updateStatus(props: {
        status: LoanStatus,
    }){

    }

}