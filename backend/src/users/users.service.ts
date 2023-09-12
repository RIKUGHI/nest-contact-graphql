import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { WithPagination } from 'src/interfaces';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<any> {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        username: true,
        _count: {
          select: {
            contacts: true,
          },
        },
      },
      where: userWhereUniqueInput,
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async users(params: {
    page: number;
    q: string;
  }): Promise<WithPagination<any[]>> {
    const { page, q } = params;
    const take = 5;
    const skip = (page - 1) * take;

    const where: Prisma.UserWhereInput = {
      OR: [
        {
          name: {
            contains: q,
          },
        },
        {
          username: {
            contains: q,
          },
        },
      ],
    };

    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          username: true,
          _count: {
            select: {
              contacts: true,
            },
          },
        },
        where,
        take,
        skip,
      }),
      this.prisma.user.count({
        where,
      }),
    ]);

    return {
      total: count,
      per_page: take,
      current_page: page,
      last_page: Math.ceil(count / take),
      data: users,
    };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    const data: Prisma.UserUpdateInput = {};

    if (updateUserDto.name) data.name = updateUserDto.name;
    if (updateUserDto.username) data.username = updateUserDto.username;
    if (updateUserDto.password)
      data.password = await bcrypt.hash(updateUserDto.password, 10);

    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async remove(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.delete({ where: { id } });
  }
}
