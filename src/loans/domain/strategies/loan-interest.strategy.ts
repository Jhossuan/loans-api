import {InterestTerm} from "../value-objects/interest-term";

export interface LoanInterestStrategy {
    calculate(amount: number, term: number): InterestTerm;
}