import {LoanInterestStrategy} from "./loan-interest.strategy";

export enum Strategies {
    Dynamic = "Dynamic",
    Fixed = "Fixed"
}

export interface ILoanInterestFactory {
    getStrategy(strategy: Strategies): LoanInterestStrategy
}