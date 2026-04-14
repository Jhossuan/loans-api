import { LoanStatus } from "./loan.interfaces";

export class Loan {
    constructor(
        public userId: string,
        public customerId: string,
        public amount: number,
        public interest: number,
        public paymentDate: Date,
        private status: LoanStatus,
        public loanId?: string,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date(),
    ) {}

    public static create(props: {
        userId: string,
        customerId: string,
        amount: number,
        interest: number,
        paymentDate: Date,
    }): Loan {

        if(props.amount <= 0) throw new Error("Amount must be greater than 0");

        return new Loan(
            props.userId,
            props.customerId,
            props.amount,
            props.interest,
            props.paymentDate,
            LoanStatus.PENDING,
        )

    }

    public static updateStatus(props: {
        status: LoanStatus,
    }){

    }

}