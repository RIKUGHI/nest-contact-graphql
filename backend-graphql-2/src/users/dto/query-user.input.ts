import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QueryUserInput {
  @Field(() => Int)
  page: number;

  @Field(() => String, { nullable: true })
  q?: string;
}
