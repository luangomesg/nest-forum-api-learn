import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from 'src/generated/prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidationPipe } from 'src/validationSchemas/validation.pipe';
import { CreateUserDto } from './dto/createUser.dto';
import { updateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async signupUser(
    @Body(new ValidationPipe()) userData: CreateUserDto,
  ): Promise<{ message: string }> {
    return this.userService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAllUsers(): Promise<Omit<UserModel, 'password'>[]> {
    return this.userService.findAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Omit<UserModel, 'password'> | null> {
    return this.userService.user({ id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) userData: updateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id },
      data: userData,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.userService.deleteUser({ id });
  }
}
