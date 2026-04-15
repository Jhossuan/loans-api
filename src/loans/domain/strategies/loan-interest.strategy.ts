
export interface LoanInterestStrategy {
    calculate(amount: number, term: number): number;
}