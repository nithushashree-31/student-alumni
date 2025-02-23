import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { instanceToPlain } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './dto/user-response.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(@Query('filters') filters?: string) {
    try {
      let query: any = {};

      if (filters) {
        try {
          const parsedFilters = JSON.parse(filters);
          query = { ...query, ...parsedFilters };
        } catch (error) {
          throw new InternalServerErrorException(
            'Invalid filters format.  Must be valid JSON.',
          );
        }
      }

      const users = await this.userService.findUsers(query);
      return instanceToPlain(users.map((user) => new UserResponse(user)));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to fetch users: ${error.message}`,
      );
    }
  }

  @Get('busselton')
  @HttpCode(HttpStatus.OK)
  async getBusseltonUsers() {
    try {
      const users = await this.userService.findBusseltonUsers();
      return instanceToPlain(users.map((user) => new UserResponse(user)));
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Failed to fetch Busselton users: ${error.message}`,
      );
    }
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findUserById(id);
    return instanceToPlain(new UserResponse(user));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() signUpDto: CreateUserDto) {
    const result = await this.userService.createUser(signUpDto);
    return result;
  }

  @Get('email/:email')
  @HttpCode(HttpStatus.OK)
  async findByUserEmail(@Param('email') email: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }
    return instanceToPlain(new UserResponse(user));
  }

  @Patch('status/:id')
  async updateUserStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { isActive: boolean },
  ) {
    return await this.userService.updateUserStatus(id, data.isActive);
  }

  @Patch(':email')
  async updateUserByEmail(
    @Param('email') email: string,
    @Body() data: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateUser(email, data);
    return instanceToPlain(new UserResponse(updatedUser));
  }
}
 