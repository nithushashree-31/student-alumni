import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GlobalService } from 'src/common/global/global.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private globalService: GlobalService,
  ) {}

  async createUser(signupDto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signupDto.email,
      },
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(signupDto.password, 12);
    return this.prisma.user.create({
      data: { ...signupDto, password: hashedPassword },
    });
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }

  async updateUserMfaOtp(email: string, otp: number) {
    return await this.prisma.user.update({
      where: { email },
      data: {
        mfaOtp: otp,
        mfaOtpStartTime: new Date(),
      },
    });
  }

  async findUserById(userId: number) {
    if (!userId) throw new Error('ID needed for unique user.');

    const user = await this.prisma.user.findUnique({
      where: { userId },
    });

    if (!user) throw new NotFoundException('Not found.');
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async updateUser(email: string, data: UpdateUserDto): Promise<any> {
    
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException("User not found.");
    }

    if (data.email) {
      throw new BadRequestException("Email cannot be updated");
    }

    if (data.password !== undefined || data.newPassword !== undefined) {
      if (data.newPassword) {
        if (!data.password) {
          throw new BadRequestException("Current password is required");
        }
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
          throw new BadRequestException("Current password is incorrect");
        }
        const hashedNewPassword = await bcrypt.hash(data.newPassword, 12);
        const isSame = await bcrypt.compare(data.password, hashedNewPassword);
        if (isSame) {
          throw new BadRequestException("New password must be different from the current password");
        }
        data.password = hashedNewPassword;
        delete data.newPassword;
      } else {
        if (!data.password) {
          throw new BadRequestException("Password must be provided");
        }
      }
    }
    return this.prisma.user.update({
      where: { email },
      data,
    });
  }
  

  async updateUserStatus(userId: number, isActive: boolean) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          userId,
        },
        data: {
          isActive,
        },
      });
      return updatedUser;
    } catch (error) {
      if (error) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
      throw error;
    }
  }

  async findBusseltonUsers() {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          AND: [{ NOT: { role: 'LAND_DEVELOPER' } }],
        },
      });

      if (!users.length) {
        throw new NotFoundException(
          'No Busselton users found (excluding Land Developers)',
        );
      }

      return users;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Error finding Busselton users: ${error.message}`,
      );
    }
  }

  async findUsers(filters: any) {
    try {
      const query: any = {};

      if (filters.role) {
        query.role = filters.role;
      }

      const users = await this.prisma.user.findMany({
        where: query,
      });

      if (!users.length) {
        throw new NotFoundException(
          `No users found with provided filters: ${JSON.stringify(filters)}`,
        );
      }

      return users;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error finding users: ${error.message}`);
    }
  }
}
