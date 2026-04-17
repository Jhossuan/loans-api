import {IsEnum, IsNotEmpty, IsString} from "class-validator";
import {LoanStatus} from "../../domain/loan.interfaces";
import {LoanStatusList} from "./pagination.dto";

export class UpdateLoanStatusDto {

    @IsString()
    @IsNotEmpty()
    customerId!: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(LoanStatus, {
        message: `Valid STATUS are: ${LoanStatusList}`
    })
    newStatus!: LoanStatus;

}