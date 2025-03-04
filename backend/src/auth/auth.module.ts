import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

console.log('JWT Expiration Time:', process.env.JWT_TOKEN_EXPIRES_IN);

@Module({
  imports:[
    UserModule,
    JwtModule.register({
      global:true,
      secret:'Nithusha@123',
      signOptions:{
        expiresIn: '1h',
      }
    })
],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
