import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsResolver } from './contacts.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ContactsResolver, ContactsService, PrismaService],
})
export class ContactsModule {}
