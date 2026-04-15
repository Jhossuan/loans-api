
export class User {
    private constructor(
        public userId: string,
        public email: string,
        public name: string,
        public password: string,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date(),
    ) {}

    public static create(props: {
        userId: string,
        email: string,
        name: string,
        password: string,
    }): User {
        return new User(
            props.userId,
            props.email,
            props.name,
            props.password,
        )
    }

}