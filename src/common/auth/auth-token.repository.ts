export interface AuthTokenRepository {
    generate(payload: any): Promise<string>;
    verify(token: string): Promise<any>;
}