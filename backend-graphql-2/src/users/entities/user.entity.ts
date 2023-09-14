import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
class ContactCount {
  @Field(() => Int)
  contacts: number;
}

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field(() => ContactCount)
  _count: ContactCount;
}
