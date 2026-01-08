import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordService } from 'src/password/password.service';
import { JwtModule } from 'src/jwt/jwt.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule
  ],
  providers: [AuthService, PasswordService],
  controllers: [AuthController]
})
export class AuthModule {}
