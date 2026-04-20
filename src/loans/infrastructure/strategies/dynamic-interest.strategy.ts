import {LoanInterestStrategy} from "../../domain/strategies/loan-interest.strategy";
import {InterestTerm} from "../../domain/value-objects/interest-term";

export class DynamicInterestStrategy implements LoanInterestStrategy {
    calculate(amount: number, term: number): InterestTerm {
        return InterestTerm.create(amount * (term / 100));
    }
}