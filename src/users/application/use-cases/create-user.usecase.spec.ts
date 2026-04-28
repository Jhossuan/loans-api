import {CreateUserUseCase} from "./create-user.usecase";
import {UserRepository} from "../../domain/user.repository";
import {PasswordHasher} from "../services/password-hasher";
import {User} from "../../domain/user.entity";

describe('CreateUserUseCase', () => {
    let useCase: CreateUserUseCase;

    let userRepositoryMock: jest.Mocked<UserRepository>
    let passwordHasherMock: jest.Mocked<PasswordHasher>

    beforeEach(() => {

        userRepositoryMock = {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            findUserByEmail: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        }

        passwordHasherMock = {
            hash: jest.fn(),
            compare: jest.fn(),
        }

        useCase = new CreateUserUseCase(
            userRepositoryMock as any,
            passwordHasherMock
        )

    })

    it('should create a user successfully', async() => {
        const email = "test@test.com"
        const name = "User Test"
        const password = "password123"
        const hashedPassword = "hashed_123456"

        passwordHasherMock.hash.mockResolvedValue(hashedPassword);
        userRepositoryMock.create.mockImplementation(async(user: User) => user);

        const result = await useCase.execute(
            email, name, password
        )

        expect(passwordHasherMock.hash).toHaveBeenCalledWith(password);
        expect(userRepositoryMock.create).toHaveBeenCalled()

        const createdUser = userRepositoryMock.create.mock.calls[0][0];

        expect(createdUser.email).toBe(email);
        expect(createdUser.name).toBe(name);
        expect(createdUser.password).toBe(hashedPassword);

        expect(result).toBeInstanceOf(User)
    })

});