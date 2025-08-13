import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { RESET_TOKEN_REPOSITORY, THEME_REPOSITORY, USER_REPOSITORY } from './repository.token';
import { User, UserSchema } from 'src/domains/user/schemas';
import { MongoUserRepository } from '../mongodb/';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from 'src/domains/theme/entities'
import { PostgresThemeRepository } from '../postgres';
import { MongoRepository } from '../mongodb';
import { PasswordResetToken, PasswordResetTokenSchema } from 'src/domains/user/schemas';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name : PasswordResetToken.name, schema : PasswordResetTokenSchema}
    ]),
    TypeOrmModule.forFeature(
      [Theme]
    )

  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useFactory: (userModel) => new MongoUserRepository(userModel),
      inject: [getModelToken(User.name)],
      // useClass: MongoUserRepository,
    },
    {
      provide: THEME_REPOSITORY,
      useClass: PostgresThemeRepository,
    },
    {
      provide: RESET_TOKEN_REPOSITORY,
      useFactory: (resetTokenModel) => new MongoRepository<PasswordResetToken>(resetTokenModel),
      inject: [getModelToken(PasswordResetToken.name)],
    }

  ],
  exports: [USER_REPOSITORY, THEME_REPOSITORY, RESET_TOKEN_REPOSITORY],
})
export class DatabaseModule {}
