import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
  Context,
} from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { PaginatedContact } from './entities/paginated-contact.entity';
import { QueryContactArgs } from './dto/query-contact.args';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

const pubSub = new PubSub();

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation(() => Contact)
  @UseGuards(JwtAuthGuard)
  async createContact(
    @Args('createContactInput') createContactInput: CreateContactInput,
    @Context() ctx,
  ) {
    const { userId } = ctx.req.user;
    const contact = await this.contactsService.create(
      userId,
      createContactInput,
    );
    pubSub.publish('contactAdded', { contactAdded: contact });
    return contact;
  }

  @Query(() => PaginatedContact, { name: 'contacts' })
  @UseGuards(JwtAuthGuard)
  getContacts(@Args() queryContactArgs: QueryContactArgs, @Context() ctx) {
    const { userId } = ctx.req.user;

    return this.contactsService.contacts({
      userId,
      page: queryContactArgs.page,
      q: queryContactArgs.q ?? '',
    });
  }

  @Query(() => Contact, { name: 'contact' })
  @UseGuards(JwtAuthGuard)
  getContact(@Args('id', { type: () => Int }) id: number, @Context() ctx) {
    const { userId } = ctx.req.user;

    return this.contactsService.contact({ id, userId });
  }

  @Mutation(() => Contact)
  @UseGuards(JwtAuthGuard)
  updateContact(
    @Args('updateContactInput') updateContactInput: UpdateContactInput,
    @Context() ctx,
  ) {
    const { userId } = ctx.req.user;

    return this.contactsService.update(userId, updateContactInput);
  }

  @Mutation(() => Contact)
  @UseGuards(JwtAuthGuard)
  removeContact(@Args('id', { type: () => Int }) id: number, @Context() ctx) {
    const { userId } = ctx.req.user;

    return this.contactsService.remove(userId, id);
  }

  @Subscription(() => Contact, {
    name: 'contactAdded',
    // resolve: (value) => value,
  })
  contactAdded() {
    return pubSub.asyncIterator('contactAdded');
  }
}
