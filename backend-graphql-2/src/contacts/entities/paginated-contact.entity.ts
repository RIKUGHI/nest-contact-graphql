import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/model/pagination.model';
import { Contact } from './contact.entity';

@ObjectType()
export class PaginatedContact extends Paginated(Contact) {}
