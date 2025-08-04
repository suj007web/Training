import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordService } from 'src/domains/common/password.service';


@Injectable()
export class BcryptPasswordService implements PasswordService{
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}