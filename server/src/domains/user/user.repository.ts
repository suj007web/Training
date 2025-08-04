import { BaseRepository } from "../common/base.repository";
import { User } from "../user/user.entity";


export interface UserRepository extends BaseRepository<User>{
    findByUsernameOrEmail(username: string, email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}