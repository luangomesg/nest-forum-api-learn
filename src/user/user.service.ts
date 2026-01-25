import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, User } from 'src/generated/prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    if (await this.prisma.user.findUnique({ where: { email: data.email } }))
      throw new ConflictException('Usuario já existe');

    const hashPassword = await bcrypt.hash(data.password, 10);
    await this.prisma.user.create({
      data: { ...data, password: hashPassword },
    });
    return { message: 'User created successfully' };
  }

  async findAllUsers(): Promise<Omit<User, 'password'>[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Omit<User, 'password'> | null> {
    const findUser = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    if (!findUser) throw new NotFoundException('User not found');
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    const findUser = await this.prisma.user.findUnique({ where });
    if (!findUser) throw new NotFoundException('User not found');
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<{ message: string }> {
    const findUser = await this.prisma.user.findUnique({ where });
    if (!findUser) throw new NotFoundException('User not found');
    await this.prisma.user.delete({
      where,
    });

    return { message: 'User deleted successfully' };
  }
}
