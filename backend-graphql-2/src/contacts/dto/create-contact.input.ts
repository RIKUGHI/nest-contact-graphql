import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactInput {
  @Field()
  first_name: string;

  @Field()
  last_name: string;

  @Field()
  email: string;

  @Field()
  phone: string;
}
