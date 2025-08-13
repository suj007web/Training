import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController, AppService } from '.';
import { UserModule } from 'src/domains/user';
import { AppConfigService, AppConfigModule } from 'src/config';


@Module({
  imports: [
    AppConfigModule,

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
