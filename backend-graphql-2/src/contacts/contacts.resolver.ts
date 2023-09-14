import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';
import { CreateContactInput } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { PaginatedContact } from './entities/paginated-contact.entity';
import { QueryContactArgs } from './dto/query-contact.args';

@Resolver(() => Contact)
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Mutation(() => Contact)
  createContact(
    @Args('createContactInput') createContactInput: CreateContactInput,
  ) {
    return this.contactsService.create(createContactInput);
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
}
