import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Subscription,
} from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { PaginatedContact } from './entities/paginated-contact.entity';
import { QueryContactArgs } from './dto/query-contact.args';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation(() => Contact)
  async createContact(
    @Args('createContactInput') createContactInput: CreateContactInput,
  ) {
    const contact = await this.contactsService.create(createContactInput);
    pubSub.publish('contactAdded', { contactAdded: contact });
    return contact;
  }

  @Query(() => PaginatedContact, { name: 'contacts' })
  getContacts(@Args() queryContactArgs: QueryContactArgs) {
    return this.contactsService.contacts({
      page: queryContactArgs.page,
      q: queryContactArgs.q ?? '',
    });
  }

  @Query(() => Contact, { name: 'contact' })
  getContact(@Args('id', { type: () => Int }) id: number) {
    return this.contactsService.contact({ id });
  }

  @Mutation(() => Contact)
  updateContact(
    @Args('updateContactInput') updateContactInput: UpdateContactInput,
  ) {
    return this.contactsService.update(updateContactInput);
  }

  @Mutation(() => Contact)
  removeContact(@Args('id', { type: () => Int }) id: number) {
    return this.contactsService.remove(id);
  }

  @Subscription(() => Contact, {
    name: 'contactAdded',
    // resolve: (value) => value,
  })
  contactAdded() {
    return pubSub.asyncIterator('contactAdded');
  }
}
