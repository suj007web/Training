import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { SecurityModule } from 'src/infrastructure/security/security.module';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { RolesGuard } from 'src/guards/roles.guard';


@Module({
  imports : [
    DatabaseModule,
    JwtModule.register({
      secret : 'secret',
      signOptions: { expiresIn: '1h' }
    }),
    SecurityModule,
    PassportModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy,
    RolesGuard
  ],
  exports:[UserService]
})
export class UserModule {}
