import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@ArgsType()
export class QueryUserArgs {
  @Field(() => Int)
  page: number;

  @Field(() => String, { nullable: true })
  q?: string;
}
