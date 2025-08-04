import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/domains/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { SecurityModule } from 'src/infrastructure/security/security.module';
import { MongoUserRepository } from 'src/infrastructure/mongodb/mongo-user.repository';
import { USER_REPOSITORY } from 'src/domains/user/user.token';


@Module({
  imports : [
    MongooseModule.forFeature([
      {
        name : User.name,
        schema : UserSchema
      }
    ]),
    JwtModule.register({
      secret : 'secret',
      signOptions: { expiresIn: '1h' }
    }),
    SecurityModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide : USER_REPOSITORY,
      useClass: MongoUserRepository
    }
  ],
  exports:[UserService]
})
export class UserModule {}
