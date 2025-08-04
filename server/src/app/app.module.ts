import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/modules/user/user.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sujalchauhan:1234@cluster0.theoolu.mongodb.net/'),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
