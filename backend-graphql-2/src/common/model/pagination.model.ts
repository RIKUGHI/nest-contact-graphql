import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pagination {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  per_page: number;

  @Field(() => Int)
  current_page: number;

  @Field(() => Int)
  last_page: number;
}
