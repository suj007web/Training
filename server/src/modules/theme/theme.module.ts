import { Module } from '@nestjs/common';
import { ThemeController } from './theme.controller';
import { ThemeService } from './theme.service';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    DatabaseModule,
        JwtModule.register({
          secret : 'secret',
          signOptions: { expiresIn: '1h' }
        }),
        PassportModule,
        
  ],
  controllers: [ThemeController],
  providers: [ThemeService],
  exports: [ThemeService]
})
export class ThemeModule {}
