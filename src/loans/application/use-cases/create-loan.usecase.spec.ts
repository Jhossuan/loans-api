import {CreateLoanUseCase} from './create-loan.usecase'
import {Loan} from "../../domain/loan.entity";
import {Strategies} from "../../domain/strategies/loan-interest.factory";
import {LoanAmount} from "../../domain/value-objects/loan-amount";

describe('CreateLoanUseCase', () => {
    let useCase: CreateLoanUseCase;

    const factoryMock = {
        getStrategy: jest.fn()
    }

    const strategyMock = {
        calculate: jest.fn()
    }

    const loanRepositoryMock = {
        create: jest.fn(),
    }

    const userLoanRepositoryMock = {
        exists: jest.fn(),
    }

    beforeEach(() => {
        jest.clearAllMocks();

        useCase = new CreateLoanUseCase(
            factoryMock as any,
            loanRepositoryMock as any,
            userLoanRepositoryMock as any,
        );
    })

    it('should create a loan successfully', async() => {
        userLoanRepositoryMock.exists.mockResolvedValue(true)//userExists

        factoryMock.getStrategy.mockReturnValue(strategyMock)// strategy
        strategyMock.calculate.mockReturnValue(150)// interestRate

        loanRepositoryMock.create.mockImplementation(async (loan: Loan) => loan);
        const amountVO = LoanAmount.create(1000)

        const result = await useCase.execute(
            'loanId',
            'user1',
            'customer1',
            amountVO.getValue(),
            0.15,
            Strategies.Dynamic,
            "2026-05-01"
        )

        expect(userLoanRepositoryMock.exists).toHaveBeenCalledWith('user1');
        expect(factoryMock.getStrategy).toHaveBeenCalledWith(Strategies.Dynamic);
        expect(strategyMock.calculate).toHaveBeenCalledWith(1000, 0.15);
        expect(loanRepositoryMock.create).toHaveBeenCalled();

        expect(result).toBeInstanceOf(Loan);
    });

    it('should throw error if user does not exist', async() => {
        userLoanRepositoryMock.exists.mockResolvedValue(false)//userExists
        let amountVO = LoanAmount.create(1000)

        await expect(
            useCase.execute('loanId','user1', 'customer1', amountVO.getValue(), 0.15, Strategies.Dynamic, "2026-05-01"),
        ).rejects.toThrow('User not found');

        expect(loanRepositoryMock.create).not.toHaveBeenCalled();
    })

})