import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/model/pagination.model';
import { User } from './user.entity';

@ObjectType()
export class PaginatedUser extends Paginated(User) {}
