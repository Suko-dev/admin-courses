import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PaginatedResource, PaginationMetadata } from '../../pagination';

export function GraphqlPaginatedResponse<Item>(
  TItemClass: Type<Item>
): Type<PaginatedResource<Item>> {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass implements PaginatedResource<Item> {
    @Field(() => [TItemClass])
    data: Item[];

    @Field(() => GraphqlPaginationMetadata)
    meta: GraphqlPaginationMetadata;
  }
  return PaginatedResponseClass as Type<PaginatedResource<Item>>;
}

@ObjectType('PaginationMetadata')
export class GraphqlPaginationMetadata implements PaginationMetadata {
  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  total: number;

  @Field({ nullable: true })
  hasNextPage: boolean | null;

  @Field({ nullable: true })
  hasPreviousPage: boolean | null;

  @Field(() => Int)
  lastPage: number;
}
