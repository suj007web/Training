
import { MongoRepository } from "./mongo.repository";
import { UserRepositoryPort } from "src/domains/user/ports";
import { User } from "src/domains/user/schemas";

export class MongoUserRepository
  extends MongoRepository<User>
  implements UserRepositoryPort
{
  async addActiveToken(id: string, token: string): Promise<void> {
    await this.model.findByIdAndUpdate(
      id,
      { $addToSet: { activeTokens: token } },
      { new: true }
    ).exec();
  }

  async removeActiveToken(id: string, token: string): Promise<void> {
    token = token.trim();
    await this.model.updateOne(
      { _id: id },
      { $pull: { activeTokens: token } }
    ).exec();
  }
}
