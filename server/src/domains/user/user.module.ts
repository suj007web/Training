import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SecurityModule } from 'src/common/infrastructure/security';
import { DatabaseModule } from 'src/common/infrastructure/database';
import { JwtStrategy } from 'src/common/strategies';
import { RolesGuard } from 'src/common/guards';
import { ThemeModule } from '../theme';
import { UserController, PasswordResetController } from './controller';
import { UserService, PasswordResetService } from './services';


@Module({
  imports : [
    DatabaseModule,
    JwtModule.register({
      secret : 'secret',
      signOptions: { expiresIn: '1h' }
    }),
    SecurityModule,
    PassportModule,
    ThemeModule
  ],
  controllers: [UserController, PasswordResetController],
  providers: [
    UserService,
    JwtStrategy,
    RolesGuard,
    PasswordResetService
  ],
  exports:[UserService]
})
export class UserModule {}
