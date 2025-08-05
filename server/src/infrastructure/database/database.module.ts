import { Module } from '@nestjs/common';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoRepository } from '../mongodb/mongo.repository';
import { USER_REPOSITORY } from './repository.token';
import { User, UserSchema } from 'src/domains/user/user.entity';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useFactory: (userModel) => new MongoRepository<User>(userModel),
      inject: [getModelToken(User.name)],
    },

  ],
  exports: [USER_REPOSITORY],
})
export class DatabaseModule {}
