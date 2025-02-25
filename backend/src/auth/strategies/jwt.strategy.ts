import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { GlobalService } from 'src/common/global/global.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly globalService: GlobalService,
  ) {
    // Get JWT secret before calling super()
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.token || null, // Extract JWT from cookies
        ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
      ]),
      secretOrKey: jwtSecret, // Pass JWT secret
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.userId) {
      throw new UnauthorizedException();
    }

    const { iat, exp, ...userPayload } = payload;
    const user = await this.userService.findUserById(payload.userId);
    
    if (!user) {
      throw new UnauthorizedException();
    }

    this.globalService.setUser(user);
    return userPayload;
  }
}
 