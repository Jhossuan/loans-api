export class AppError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number = 500,
        public readonly errorCode?: string
    ) {
        super(message);

        this.name = 'AppError';
        this.statusCode = statusCode;
        this.errorCode = errorCode;

        Object.setPrototypeOf(this, AppError.prototype);
    }

}