import {DynamicInterestStrategy} from "../strategies/dynamic-interest.strategy";
import {FixedInterestStrategy} from "../strategies/fixed-interest.strategy";
import {LoanInterestStrategy} from "../../domain/strategies/loan-interest.strategy";
import {ILoanInterestFactory, Strategies} from "../../domain/strategies/loan-interest.factory";
import {Injectable} from "@nestjs/common";

type OptionStrategiesT = {
    [Strategies.Dynamic]: DynamicInterestStrategy,
    [Strategies.Fixed]: FixedInterestStrategy,
}

@Injectable()
export class InterestStrategyFactory implements ILoanInterestFactory {
    constructor(
        private dynamicStrategy: DynamicInterestStrategy,
        private fixedStrategy: FixedInterestStrategy
    ) {}

    getStrategy(strategy: Strategies): LoanInterestStrategy {
        const strategies: OptionStrategiesT = {
            Dynamic: this.dynamicStrategy,
            Fixed: this.fixedStrategy,
        }
        return strategies[strategy];
    }

}