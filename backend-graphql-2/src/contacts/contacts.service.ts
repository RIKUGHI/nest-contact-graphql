import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async contact(
    userWhereUniqueInput: Prisma.ContactWhereUniqueInput,
  ): Promise<any> {
    const contact = await this.prisma.contact.findUnique({
      where: userWhereUniqueInput,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    if (!contact) throw new NotFoundException('Contact not found');

    return contact;
  }

  async contacts(params: {
    userId?: number;
    page: number;
    q: string;
  }): Promise<WithPagination<any[]>> {
    const { page, q } = params;
    const take = 5;
    const skip = (page - 1) * take;

    const where: Prisma.ContactWhereInput = {
      ...(params.userId && { userId: params.userId }),
      OR: [
        {
          first_name: {
            contains: q,
          },
        },
        {
          last_name: {
            contains: q,
          },
        },
      ],
    };

    const [contacts, count] = await this.prisma.$transaction([
      this.prisma.contact.findMany({
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          phone: true,
          userId: true,
          user: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
        },
        where,
        take,
        skip,
      }),
      this.prisma.contact.count({
        where,
      }),
    ]);

    return {
      total: count,
      per_page: take,
      current_page: page,
      last_page: Math.ceil(count / take),
      result: contacts,
    };
  }

  async create(createContactInput: CreateContactInput) {
    return this.prisma.contact.create({
      data: {
        ...createContactInput,
        user: {
          connect: {
            id: 1,
          },
        },
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }

  async update(updateContactInput: UpdateContactInput) {
    const where: Prisma.ContactWhereUniqueInput = {
      id: updateContactInput.id,
      userId: 1,
    };

    const contact = await this.prisma.contact.findUnique({
      where,
    });

    if (!contact) throw new NotFoundException('Contact not found');

    const data: Prisma.ContactUpdateInput = {};

    if (updateContactInput.first_name)
      data.first_name = updateContactInput.first_name;
    if (updateContactInput.last_name)
      data.last_name = updateContactInput.last_name;
    if (updateContactInput.email) data.email = updateContactInput.email;
    if (updateContactInput.phone) data.phone = updateContactInput.phone;

    return this.prisma.contact.update({
      where,
      data,
      select: {
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    const where: Prisma.ContactWhereUniqueInput = {
      id,
      userId: 1,
    };

    const contact = await this.prisma.contact.findUnique({
      where,
    });

    if (!contact) throw new NotFoundException('Contact not found');

    return this.prisma.contact.delete({
      where,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });
  }
}
