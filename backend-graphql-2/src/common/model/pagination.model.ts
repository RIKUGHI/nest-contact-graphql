import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export interface IPaginatedType<T> {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  result: T[];
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => Int)
    total: number;

    @Field(() => Int)
    per_page: number;

    @Field(() => Int)
    current_page: number;

    @Field(() => Int)
    last_page: number;

    @Field(() => [classRef])
    result: T[];
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}
