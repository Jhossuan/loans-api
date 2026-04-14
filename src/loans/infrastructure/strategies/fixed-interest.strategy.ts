import {LoanInterestStrategy} from "../../domain/strategies/loan-interest.strategy";

export class FixedInterestStrategy implements LoanInterestStrategy {
    calculate(amount: number, term: number): number {
        console.log(term)
        return amount * 0.20; //20%
    }
}