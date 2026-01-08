import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PasswordService } from './password/password.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, JwtModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, PasswordService, AuthService],
})
export class AppModule {}
