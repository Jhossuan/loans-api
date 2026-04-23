import { Model } from 'mongoose';
import { User } from '../../domain/user.entity';
import { User as UserSchema } from './schemas/user.schema';
import { GetMetadataI } from '../../domain/user.interfaces';
import { UserRepository } from '../../domain/user.repository';
import { InjectModel } from '@nestjs/mongoose/dist';
import {AppError} from "../../../common/errors/app-error";

export class MongodbUserRepository implements UserRepository {

    constructor(
        @InjectModel(UserSchema.name) private userModel: Model<UserSchema>
    ){}

    async create(user: User): Promise<User> {
        try {
            const newUser = new this.userModel(user);
            await newUser.save();
            return User.create({
                userId: newUser.userId,
                email: newUser.email,
                name: newUser.name,
                password: newUser.password,
            });
        } catch (error: any) {
            throw new AppError(
                error?.message || "Error creating user",
                500, error?.code
            );
        }
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.userModel.findOne({ userId: id });
        if (!user) return null;
        return User.create({
            userId: user.userId,
            email: user.email,
            name: user.name,
            password: user.password,
        });
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email: email });
        if (!user) return null;
        return User.create({
            userId: user.userId,
            email: user.email,
            name: user.name,
            password: user.password,
        });
    }

    async findAll(page: number, limit: number): Promise<{ users: User[], metadata: GetMetadataI }> {
        
        const totalDocuments = await this.userModel.countDocuments({ visible: true });
        const users = await this.userModel.aggregate([
            {
                $match: {
                    visible: true
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ])

        return {
            users: users.map((user) => User.create({
                userId: user.userId,
                email: user.email,
                name: user.name,
                password: user.password,
            })),
            metadata: {
                currentPage: page,
                lastPage: Math.ceil(totalDocuments / limit),
                totalDocuments: totalDocuments
            }
        };
    }

    async update(user: User): Promise<User> {
        const updated = await this.userModel.findOneAndUpdate(
            { userId: user.userId },
            { $set: user },
            { new: true }
        );
        if (!updated) throw new AppError('User not found', 400);
        return User.create({
            userId: updated.userId,
            email: updated.email,
            name: updated.name,
            password: updated.password,
        });
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.userModel.findOneAndUpdate(
            { userId: id },
            { $set: { visible: false } },
            { new: true }
        );
        if (!deleted) throw new AppError('User not found', 400);
        return;
    }
}