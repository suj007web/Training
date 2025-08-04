import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type UserDocument = User & Document;

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Schema()
export class User{
    _id?: Types.ObjectId;
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER
    })
    role: UserRole;
    

}

export const UserSchema = SchemaFactory.createForClass(User);