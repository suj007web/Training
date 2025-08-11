import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('appConfig.port')!;
  }

  get mongoUri(): string {
    return this.configService.get<string>('appConfig.mongo.uri')!;
  }

  get sessionSecret() : string{
    return this.configService.get<string>('appConfig.sessionSecret')!;
  }

  get environment(): string {
    return this.configService.get<string>('appConfig.environment') || 'development';
  }

  get postgreConfig(){
    return {
      type : 'postgres' as const,
      host : this.configService.get<string>('appConfig.postgres.host')!,
      port : this.configService.get<number>('appConfig.postgres.port')!,
      username : this.configService.get<string>('appConfig.postgres.username')!,
      password : this.configService.get<string>('appConfig.postgres.password')!,
      database : this.configService.get<string>('appConfig.postgres.database')!,
      synchronize : this.configService.get<boolean>('appConfig.postgres.synchronize') || false,
      autoLoadEntities : this.configService.get<boolean>('appConfig.postgres.autoLoadEntities') || true,
    }
  }

}
