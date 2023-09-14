import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { Pagination } from 'src/common/model/pagination.model';

@ObjectType()
export class PaginatedUser extends Pagination {
  @Field(() => [User])
  result: User[];
}
