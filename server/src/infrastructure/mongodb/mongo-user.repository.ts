import { ConflictException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/domains/user/user.repository";
import { Model } from "mongoose";
import { User, UserDocument } from "src/domains/user/user.entity";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class MongoUserRepository implements UserRepository{
    constructor(
        @InjectModel(User.name) private readonly userModel : Model<UserDocument>,
    ){}
    async findById(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec()
    }
    async findAll(): Promise<User[]> {
        return this.userModel.find().exec().then(users => users.map(user => user.toObject() as User));
    }
    async update(id: string, data: Partial<User>): Promise<User | null> {
        const updatedUser = await this.userModel.findByIdAndUpdate(id, data, { new: true }).exec();
        return updatedUser ? updatedUser.toObject() as User : null;
    }
    async delete(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id).exec();
    }
    async create(data : User) : Promise<User>{
        const existingUser = await this.findByUsernameOrEmail(data.username, data.email);
        if (existingUser) {
            throw new ConflictException('User with this username or email already exists');
        }

        const newUser = new this.userModel(data);
        const savedUser = await newUser.save();
        return savedUser.toObject() as User;
    }

    async findByUsernameOrEmail(username : string, email : string): Promise<User | null> {
        return this.findByData({
            username,
            email
        })
    }

    async findByData(query: Partial<User>): Promise<User | null> {
        const queryKeys = Object.keys(query);
        if (queryKeys.length === 0) {
            return null;
        }

        const condition = queryKeys.length === 1
            ? query
            : { $or: Object.entries(query).map(([key, value]) => ({ [key]: value })) };

        const user = await this.userModel.findOne(condition).exec();
        return user ? user.toObject() as User : null;
    }

}