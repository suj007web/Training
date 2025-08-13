import { BaseRepository } from "src/common/base.repository";
import { User } from "../schemas/user.schema";

export interface UserRepositoryPort extends BaseRepository<User> {
  addActiveToken(userId: string, token: string): Promise<void>;
  removeActiveToken(userId: string, token: string): Promise<void>;
}