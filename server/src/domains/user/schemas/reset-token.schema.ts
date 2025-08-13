import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PasswordResetTokenDocument = PasswordResetToken & Document;

@Schema({ timestamps: true })
export class PasswordResetToken {

    _id?: Types.ObjectId | string;

  @Prop({ required: true, unique: true })
  token: string;

  @Prop({
    required: true,
  }) 
  email : string; 


  @Prop({ default: false })
  used: boolean;

  @Prop({ required: true })
  expiresAt: Date; 
}

export const PasswordResetTokenSchema = SchemaFactory.createForClass(PasswordResetToken);
PasswordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });