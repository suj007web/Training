import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/modules/user/user.module';
import { AppConfigService } from 'src/config/config.service';
import { AppConfigModule } from 'src/config/config.module';
import { PasswordResetModule } from 'src/modules/password-reset.tsx/password-controller.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    AppConfigModule,
    PasswordResetModule,
    MongooseModule.forRootAsync({
      imports : [AppConfigModule],
      useFactory : (appConfigService : AppConfigService) => ({
        uri : appConfigService.mongoUri
      }),
      inject : [AppConfigService]
    }),
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory : (appConfigService : AppConfigService) => appConfigService.postgreConfig,
      inject: [AppConfigService]
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
