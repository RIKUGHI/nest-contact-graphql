import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

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
      result: users,
    };
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
