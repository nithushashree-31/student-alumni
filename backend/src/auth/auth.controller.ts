import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { OtpDto } from './dto/otp.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { UserResponse } from 'src/user/dto/user-response.dto';
import { GlobalService } from 'src/common/global/global.service';
import { AuthGuard } from '@nestjs/passport';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private globalService: GlobalService,
  ) {}

  @Post('/signup')
  signup(@Body() signupDto: CreateUserDto) {
    return this.authService.signUpNewUser(signupDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/validate-otp')
  @HttpCode(HttpStatus.OK)
  async validateLoginOtp(
    @Body() data: OtpDto,
    @Query() query: ExpressQuery,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { from } = query;
    if (from === 'login') {
      const response = await this.authService.validateOtp(data, 'login');
      const token = response?.token;
      const user = response?.user;
      if (token && typeof token === 'string') {
        const maxAge = Number(process.env.COOKIE_MAX_AGE);
        const httpOnly = Boolean(process.env.COOKIE_HTTP_ONLY);
        const secure = Boolean(process.env.COOKIE_SECURE);
        const path = process.env.COOKIE_PATH;
        const domain = process.env.COOKIE_DOMAIN;
        const sameSite = process.env.COOKIE_SAMESITE as
          | boolean
          | 'lax'
          | 'strict'
          | 'none';
        res.cookie('token', token, {
          maxAge,
          httpOnly,
          secure,
          path,
          domain,
          sameSite,
        });
        return {
          message: 'Login Successful.',
          token,
          user: instanceToPlain(new UserResponse(user || {})),
        };
      }
    } else if (from === 'forgot-password') {
      return this.authService.validateOtp(data, 'forgot-password');
    }
  }

  @Post('/forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() data: { email: string }) {
    return this.authService.sendForgotPasswordOtp(data.email);
  }

  @Post('/update-password')
  @HttpCode(HttpStatus.OK)
  updatePassword(@Body() data: { email: string; password: string }) {
    return this.authService.updatePassword(data.email, data.password);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMe() {
    const user = this.globalService.getUser();
    return instanceToPlain(new UserResponse(user));
  }
}
