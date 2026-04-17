import {ILoanRepository} from "../../domain/loan.repository";

export class FindLoanUseCase {
    constructor(
        private readonly loanRepository: ILoanRepository,
    ) {}

    execute(loanId: string){
      return this.loanRepository.findById(loanId);
    }
}