import {LoanInterestStrategy} from "../../domain/strategies/loan-interest.strategy";

export class DynamicInterestStrategy implements LoanInterestStrategy {
    calculate(amount: number, term: number): number {
        let formattedTerm = term;
        if(Number.isInteger(term)) formattedTerm = (term / 100)
        return amount * formattedTerm;
    }
}