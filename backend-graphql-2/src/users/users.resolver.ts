import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { QueryUserArgs } from './dto/query-user.arg';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginatedUser } from './entities/paginated-user.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { ContactsService } from 'src/contacts/contacts.service';
import { Contact } from 'src/contacts/entities/contact.entity';
import { PaginatedContact } from 'src/contacts/entities/paginated-contact.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly contactsService: ContactsService,
  ) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => PaginatedUser, { name: 'users' })
  findAll(@Args() queryUserArg: QueryUserArgs) {
    return this.usersService.users({
      page: queryUserArg.page,
      q: queryUserArg.q ?? '',
    });
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.user({ id });
  }

  @ResolveField('contacts', () => PaginatedContact)
  getContacts(@Parent() user: User) {
    return this.contactsService.contacts({ userId: user.id, page: 1, q: '' });
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
