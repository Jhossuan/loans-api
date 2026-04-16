import {AppError} from "../../../common/errors/app-error";

export class LoanAmount {

    private readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    static create(value: number): LoanAmount {
        if(!value) {
            throw new AppError("Loan amount is required");
        }

        if(isNaN(value)) {
            throw new AppError("Loan amount must be a number");
        }

        if(value < 0) {
            throw new AppError("Loan amount must be a positive integer");
        }

        if(value > 1_000_000_000){
            throw new AppError("Loan amount is too large");
        }

        return new LoanAmount(value);
    }

    public getValue(): number {
        return this.value;
    }

}