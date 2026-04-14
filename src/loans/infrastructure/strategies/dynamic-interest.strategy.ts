import {LoanInterestStrategy} from "../../domain/strategies/loan-interest.strategy";

export class DynamicInterestStrategy implements LoanInterestStrategy {
    calculate(amount: number, term: number): number {
        return amount * term;
    }
}