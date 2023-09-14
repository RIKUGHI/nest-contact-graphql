import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/prisma.service';
import { ContactsService } from 'src/contacts/contacts.service';

@Module({
  providers: [UsersResolver, UsersService, ContactsService, PrismaService],
})
export class UsersModule {}
