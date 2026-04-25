import {IsEmail, IsNotEmpty, IsString } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserLoginDto {

    @ApiProperty({
        example: "test@test.com",
        description: "User email",
    })
    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @ApiProperty({
        example: "prueba_password022",
        description: "User password",
    })
    @IsNotEmpty()
    @IsString()
    password!: string;

}