import {Strategies} from "../../domain/strategies/loan-interest.factory";
import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

const StrategiesList = [
    Strategies.Dynamic,
    Strategies.Fixed
]

export class CreateLoanDto {
    @ApiProperty({
        example: "474f4c1f-8a26-4465-b4a5-6c2e4ae67ce2",
        description: "The userId for the admin",
    })
    @IsString()
    @IsNotEmpty()
    userId!: string;

    @ApiProperty({
        example: "01f66629-c36e-434e-8878-0039d456e38a",
        description: "The userId for the customer",
    })
    @IsString()
    @IsNotEmpty()
    customerId!: string;

    @ApiProperty({
        example: "1000",
        description: "The amount of money that you're going to lend",
    })
    @IsNumber()
    amount!: number;

    @ApiProperty({
        example: 10,
        description: "The percentage of interest per month that you will receive",
    })
    @IsNumber()
    term!: number;

    @ApiProperty({
        example: "2026-08-10",
        description: "Due date"
    })
    @IsString()
    paymentDate!: string;

    @ApiProperty({
        example: "Dynamic",
        description: "The type of loan, you could select dynamic or fixed. Fixed is 20% and dynamic is whatever you want"
    })
    @IsEnum(Strategies, {
        message: `loanType: Valid strategies ${StrategiesList}`
    })
    loanType!: Strategies;
}