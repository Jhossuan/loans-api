export interface ILoanUserRepository {
    exists(userId: string): Promise<boolean>,
}