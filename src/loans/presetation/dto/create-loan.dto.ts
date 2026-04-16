import {Strategies} from "../../domain/strategies/loan-interest.factory";
import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";

const StrategiesList = [
    Strategies.Dynamic,
    Strategies.Fixed
]

export class CreateLoanDto {
    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsString()
    @IsNotEmpty()
    customerId!: string;

    @IsNumber()
    amount!: number;

    @IsNumber()
    term!: number;

    @IsString()
    paymentDate!: string;

    @IsEnum(Strategies, {
        message: `loanType: Valid strategies ${StrategiesList}`
    })
    loanType!: Strategies;
}