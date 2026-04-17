import {Body, Controller, Get, HttpStatus, Param, Patch, Post, Query} from "@nestjs/common";
import {CreateLoanDto} from "./dto/create-loan.dto";
import {GetMetadataI, ResponseI} from "../../common/response.interface";
import {Loan} from "../domain/loan.entity";
import {CreateLoanUseCase} from "../application/use-cases/create-loan.usecase";
import {LoanPaginationDto} from "./dto/pagination.dto";
import {GetLoansUseCase} from "../application/use-cases/get-loans.usecase";
import {UpdateLoanStatusUseCase} from "../application/use-cases/update-loan-status.usecase";
import {UpdateLoanStatusDto} from "./dto/update-loan-status.dto";

@Controller('loans')
export class LoanController {

    constructor(
        private readonly createLoanUseCase: CreateLoanUseCase,
        private readonly getLoansUseCase: GetLoansUseCase,
        private readonly updateStatusUseCase: UpdateLoanStatusUseCase
    ) {}

    @Post('create')
    async create(@Body() createLoanDto: CreateLoanDto): Promise<ResponseI<Loan>> {
        const { userId, customerId, amount, term, loanType, paymentDate } = createLoanDto;
        const loan = await this.createLoanUseCase.execute(
            "",
            userId,
            customerId,
            amount,
            term,
            loanType,
            paymentDate,
        )
        return {
            data: loan,
            status: HttpStatus.CREATED,
            message: "Loan created successfully",
            success: true,
        }
    }

    @Get('findAll')
    async findAll(@Query() paginationDto: LoanPaginationDto): Promise<ResponseI<{ loans: Loan[], metadata: GetMetadataI }>>{
        const { page, limit, status } = paginationDto;
        const loans = await this.getLoansUseCase.execute(page, limit, status)
        return {
            data: loans,
            status: HttpStatus.OK,
            message: 'Loan findAll found',
            success: true,
        }
    }

    @Patch('update/:loanId/status')
    async updateStatus(@Param('loanId') loanId: string, @Body() updateStatusDto: UpdateLoanStatusDto): Promise<ResponseI<Loan | null>> {
        const { customerId, newStatus } = updateStatusDto;
        const loan = await this.updateStatusUseCase.execute(customerId, loanId, newStatus)
        return {
            data: loan,
            status: HttpStatus.OK,
            message: 'Loan status updated successfully',
            success: true,
        }
    }

}