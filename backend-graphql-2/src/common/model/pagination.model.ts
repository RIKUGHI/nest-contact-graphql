import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Pagination<T> {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  per_page: number;

  @Field(() => Int)
  current_page: number;

  @Field(() => Int)
  last_page: number;

  @Field(() => [User])
  data: T[];
}
