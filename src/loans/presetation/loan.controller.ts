import {Body, Controller, HttpException, HttpStatus, Post} from "@nestjs/common";
import {CreateLoanDto} from "./dto/create-loan.dto";
import {ResponseI} from "../../common/response.interface";
import {Loan} from "../domain/loan.entity";
import {CreateLoanUseCase} from "../application/use-cases/create-loan.usecase";

@Controller('loans')
export class LoanController {

    constructor(
        private readonly createLoanUseCase: CreateLoanUseCase,
    ) {}

    @Post('create')
    async createLoan(@Body() createLoanDto: CreateLoanDto): Promise<ResponseI<Loan>> {

        const { userId, customerId, amount, term, loanType } = createLoanDto;

        try {
            const loan = await this.createLoanUseCase.execute(
                userId,
                customerId,
                amount,
                term,
                loanType,
            )
            return {
                data: loan,
                status: HttpStatus.CREATED,
                message: "Loan created successfully",
                success: true,
            }
        } catch (error: any) {
            console.log(error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Error creating loan',
                success: false,
                error: error?.message || 'Error creating loan',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}