import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { differenceInMinutes } from 'date-fns';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login-dto';
import { OtpDto } from './dto/otp.dto';
import { instanceToPlain } from 'class-transformer';
import { UserResponse } from 'src/user/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUpNewUser(user: CreateUserDto) {
    const createdUser = await this.userService.createUser(user);
    if (createdUser) {
      return { message: 'Signup successful.' };
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User not found.');
    } else {
      const passwordMatched = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (!passwordMatched) {
        throw new UnauthorizedException('Password is incorrect!');
      } else {
        const userPayload = instanceToPlain(new UserResponse(user));
        const token = this.jwtService.sign(userPayload);
        return { token, user };
      }
    }
  }

  async validateOtp(data: OtpDto, context: string) {
    const user = await this.userService.findUserByEmail(data.email);
    const currentTime = new Date();
    const otpDate = user?.mfaOtpStartTime || new Date();
    const isOtpValid = data.otp === user?.mfaOtp;
    if (!isOtpValid) {
      throw new BadRequestException('Invalid OTP!');
    }
    const diff = differenceInMinutes(currentTime, otpDate);
    const otpExpiryTime = Number(process.env.MFA_OTP_EXPIRY_TIME);
    if (diff > otpExpiryTime) {
      throw new BadRequestException('OTP expired!');
    }
    if (context === 'login') {
      const userPayload = instanceToPlain(new UserResponse(user));
      const token = this.jwtService.sign(userPayload);
      return { token, user };
    } else if (context === 'forgot-password') {
      return { message: 'OTP verified successfully.' };
    }
  }

  async sendForgotPasswordOtp(email: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }

    const response = await this.generateOtp(email);
    if (!response) {
      throw new BadRequestException(
        'Failed to generate OTP. Please try again.',
      );
    }

    return {
      email,
      message: 'OTP sent to your email address.',
    };
  }

  async updatePassword(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const updatedUser = await this.userService.updateUser(email, {
      password: hashedPassword,
    });
    if (updatedUser) {
      return { message: 'Password updated successfully.' };
    }
  }

  async generateOtp(email: string) {
    const otp = this.getRandomInt(100000, 999999);
    return await this.userService.updateUserMfaOtp(email, otp);
  }

  getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }
}
