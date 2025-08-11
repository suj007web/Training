import { Module } from '@nestjs/common';
import { PasswordResetController } from './password-reset.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { PasswordResetService } from './password-reset.service';

@Module({
    imports : [UserModule,
      DatabaseModule
    ],
    providers : [PasswordResetService],
  controllers: [PasswordResetController],
})
export class PasswordResetModule {}
