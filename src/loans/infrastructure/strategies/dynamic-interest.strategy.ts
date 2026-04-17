import {LoanInterestStrategy} from "../../domain/strategies/loan-interest.strategy";
import {AppError} from "../../../common/errors/app-error";

export class DynamicInterestStrategy implements LoanInterestStrategy {
    calculate(amount: number, term: number): number {
        if(!Number.isInteger(term)) {
            throw new AppError("Interest term should be an integer");
        }
        return amount * (term / 100);
    }
}