import { MongoRepository } from '../mongodb/mongo.repository';
import { User, UserDocument } from 'src/domains/user/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MongoUserRepository extends MongoRepository<User> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel);
  }

  async addActiveToken(id: string, token: string): Promise<void> {
    await this.model.findByIdAndUpdate(
      id,
      { $addToSet: { activeTokens: token } }, 
      { new: true }
    ).exec();
  }

async removeActiveToken(id: string, token: string): Promise<void> {
  console.log('Removing token:', token, 'for user ID:', id);
  token = token.trim();
  const result = await this.model.updateOne(
    { _id: id },
    { $pull: { activeTokens: token } }
  );
  return ;
}



}
