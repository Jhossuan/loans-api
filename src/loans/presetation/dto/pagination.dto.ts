import {PaginationDto} from "../../../common/pagination.dto";
import {IsEnum, IsOptional, IsString} from "class-validator";
import {LoanStatus} from "../../domain/loan.interfaces";

export const LoanStatusList = [
    LoanStatus.PENDING,
    LoanStatus.REJECTED,
    LoanStatus.PAID,
    LoanStatus.APPROVED,
    LoanStatus.CANCELLED
]

export class LoanPaginationDto extends PaginationDto {

    @IsString()
    @IsOptional()
    @IsEnum(LoanStatus, {
        message: `Valid STATUS are: ${LoanStatusList}`
    })
    status!: LoanStatus;

}