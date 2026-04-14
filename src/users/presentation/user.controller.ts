import {Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Query} from "@nestjs/common";

import { User } from "../domain/user.entity";
import {GetMetadataI} from "../domain/user.interfaces";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { ResponseI } from "../../common/response.interface";
import {PaginationDto} from "../../common/pagination.dto";

import { CreateUserUseCase } from "../application/use-cases/create-user.usecase";
import { UpdateUserUseCase } from "../application/use-cases/update-user.usecase";
import {GetUsersUseCase} from "../application/use-cases/get-users.usecase";


@Controller('users')
export class UserController {

    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly getUserUseCase: GetUsersUseCase
    ){}

    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<ResponseI<User>> {
        try {
            const user = await this.createUserUseCase.execute(createUserDto.email, createUserDto.name, createUserDto.password);
            return {
                data: user,
                status: HttpStatus.CREATED,
                message: 'User created successfully',
                success: true,
            }
        } catch (error: any) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Error creating user',
                success: false,
                error: error?.message || 'Error creating user',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch('update')
    async updateUser(@Body() updateUserDto: UpdateUserDto, @Param('userId') userId: string): Promise<ResponseI<User>> {
        try {
            const user = await this.updateUserUseCase.execute(userId, {
                email: updateUserDto.email,
                name: updateUserDto.name
            });
            return {
                data: user,
                status: HttpStatus.OK,
                message: 'User updated successfully',
                success: true,
            }
        } catch (error: any) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Error updating user',
                success: false,
                error: error?.message || 'Error updating user',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('findAll')
    async findAllUsers(@Query() paginationDto: PaginationDto): Promise<ResponseI<{ users: User[], metadata: GetMetadataI }>> {
        const { page, limit } = paginationDto;
        try {
            const users = await this.getUserUseCase.execute(page, limit)
            return {
                data: users,
                status: HttpStatus.OK,
                message: 'Users found',
                success: true,
            }
        } catch (error: any){
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'Error getting user',
                success: false,
                error: error?.message || 'Error getting users',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}