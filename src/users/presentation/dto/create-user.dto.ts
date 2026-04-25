import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
        example: 'test@test.com',
        description: 'User email ( must be unique )'
    })
    @IsEmail()
    email!: string;

    @ApiProperty({
        example: 'Elon Musk',
        description: 'User name'
    })
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name!: string;

    @ApiProperty({
        example: 'prueba_password022',
        description: 'User password'
    })
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password!: string;
}