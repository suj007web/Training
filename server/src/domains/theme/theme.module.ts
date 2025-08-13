import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/common/infrastructure/database';
import { ThemeController } from './theme.controller';
import { ThemeService } from './theme.service';


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
