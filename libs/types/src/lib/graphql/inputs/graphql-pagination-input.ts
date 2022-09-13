import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('PaginationInput')
export class GraphqlPaginationInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  perPage: number;
}
