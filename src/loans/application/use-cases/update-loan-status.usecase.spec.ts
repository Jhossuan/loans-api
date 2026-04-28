import {ILoanRepository} from "../../domain/loan.repository";
import {ILoanUserRepository} from "../../domain/loan-user.repository";
import {UpdateLoanStatusUseCase} from "./update-loan-status.usecase";
import {LoanStatus} from "../../domain/loan.interfaces";
import {Loan} from "../../domain/loan.entity";
import {InterestTerm} from "../../domain/value-objects/interest-term";
import {LoanAmount} from "../../domain/value-objects/loan-amount";

describe('UpdateLoanStatusUseCase', () => {
    let useCase: UpdateLoanStatusUseCase;

    let loanRepositoryMock: jest.Mocked<ILoanRepository>
    let loanUserRepositoryMock: jest.Mocked<ILoanUserRepository>

    beforeEach(() => {
        jest.clearAllMocks()

        loanRepositoryMock = {
            create: jest.fn(),
            updateStatus: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
        }

        loanUserRepositoryMock = {
            exists: jest.fn(),
        }

        useCase = new UpdateLoanStatusUseCase(
            loanRepositoryMock,
            loanUserRepositoryMock
        )
    })

    it('should update loan status successfully', async() => {
        const customerId = "testCustomerId00112233"
        const loanId = "testLoanId00112233"
        const status = LoanStatus.PAID

        loanUserRepositoryMock.exists.mockResolvedValue(true)

        const loanMock = Loan.create({
            loanId: loanId,
            userId: "adminId123",
            customerId: customerId,
            amount: LoanAmount.create(1000),
            interest: InterestTerm.create(200),
            term: 20,
            paymentDate: new Date(),
        })

        loanRepositoryMock.findById.mockResolvedValue(loanMock)
        loanRepositoryMock.updateStatus.mockResolvedValue(loanMock)

        const result = await useCase.execute(customerId, loanId, status)

        expect(loanUserRepositoryMock.exists).toHaveBeenCalledWith(customerId)
        expect(loanRepositoryMock.findById).toHaveBeenCalledWith(loanId)
        expect(loanRepositoryMock.updateStatus).toHaveBeenCalledWith(
            customerId,
            loanId,
            status
        )

        expect(result).toBeInstanceOf(Loan)
    })

    it('should throw error if customer does not exist', async() => {
        loanUserRepositoryMock.exists.mockResolvedValue(false)

        await expect(
            useCase.execute('customerIdNotFound123', 'loanNotFoundToo123Id', LoanStatus.PAID)
        ).rejects.toThrow('Customer not found')

        expect(loanRepositoryMock.updateStatus).not.toHaveBeenCalled()
    })

})