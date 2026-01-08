import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordService } from 'src/password/password.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if(!secret) throw new Error('JWT_SECRET not loaded yet')

        const options: JwtModuleOptions = {
          secret: secret,
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRATION') || '1d'
          }
        }
        return options;
      }
    })
  ],
  providers: [
    AuthService, 
    PasswordService,
    JwtStrategy
  ],
  controllers: [AuthController],
  exports: [
    AuthService
  ]
})
export class AuthModule {}
