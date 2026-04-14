import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    email!: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password!: string;
}