
export class User {
    constructor(
        public readonly userId: string,
        public email: string,
        public name: string,
        public password: string,
    ) {}
}