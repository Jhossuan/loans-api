import {LoanInterestStrategy} from "../../domain/strategies/loan-interest.strategy";
import {InterestTerm} from "../../domain/value-objects/interest-term";

export class FixedInterestStrategy implements LoanInterestStrategy {
    calculate(amount: number, term: number): InterestTerm {
        return InterestTerm.create(amount * 0.20); //20%
    }
}