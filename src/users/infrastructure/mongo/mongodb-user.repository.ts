import { Model } from 'mongoose';
import { User } from '../../domain/user.entity';
import { User as UserSchema } from './schemas/user.schema';
import { GetMetadataI } from '../../domain/user.interfaces';
import { UserRepository } from '../../domain/user.repository';
import { InjectModel } from '@nestjs/mongoose/dist';

export class MongodbUserRepository implements UserRepository {

    constructor(
        @InjectModel(UserSchema.name) private userModel: Model<UserSchema>
    ){}

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        await newUser.save();
        return new User(newUser.userId, newUser.email, newUser.name, newUser.password);
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.userModel.findOne({ userId: id });
        if (!user) return null;
        return new User(user.userId, user.email, user.name, user.password);
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
            users: users.map((user) => new User(
                user.userId,
                user.email,
                user.name,
                user.password
            )),
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
        if (!updated) throw new Error('User not found');
        return new User(updated.userId, updated.email, updated.name, updated.password);
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.userModel.findOneAndUpdate(
            { userId: id },
            { $set: { visible: false } },
            { new: true }
        );
        if (!deleted) throw new Error('User not found');
        return;
    }
}