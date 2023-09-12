import { Injectable, NotFoundException } from '@nestjs/common';
import { Contact, Prisma, User } from '@prisma/client';
import { WithPagination } from 'src/interfaces';
import { PrismaService } from 'src/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async contact(
    userWhereUniqueInput: Prisma.ContactWhereUniqueInput,
  ): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: userWhereUniqueInput,
    });

    if (!contact) throw new NotFoundException('Contact not found');

    return contact;
  }

  async contacts(
    user: User,
    params: {
      page: number;
      q: string;
    },
  ): Promise<WithPagination<Contact[]>> {
    const { page, q } = params;
    const take = 5;
    const skip = (page - 1) * take;

    const where: Prisma.ContactWhereInput = {
      userId: user.id,
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
      data: contacts,
    };
  }

  async create(user: User, createContactDto: CreateContactDto) {
    return this.prisma.contact.create({
      data: {
        ...createContactDto,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async update(user: User, id: number, updateContactDto: UpdateContactDto) {
    const where: Prisma.ContactWhereUniqueInput = {
      id,
      userId: user.id,
    };

    const contact = await this.prisma.contact.findUnique({
      where,
    });

    if (!contact) throw new NotFoundException('Contact not found');

    const data: Prisma.ContactUpdateInput = {};

    if (updateContactDto.first_name)
      data.first_name = updateContactDto.first_name;
    if (updateContactDto.last_name) data.last_name = updateContactDto.last_name;
    if (updateContactDto.email) data.email = updateContactDto.email;
    if (updateContactDto.phone) data.phone = updateContactDto.phone;

    return this.prisma.contact.update({
      where,
      data,
    });
  }

  async remove(user: User, id: number) {
    const where: Prisma.ContactWhereUniqueInput = {
      id,
      userId: user.id,
    };

    const contact = await this.prisma.contact.findUnique({
      where,
    });

    if (!contact) throw new NotFoundException('Contact not found');

    return this.prisma.contact.delete({ where });
  }
}
