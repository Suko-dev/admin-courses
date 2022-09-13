import { Field, ObjectType } from '@nestjs/graphql';
import { GraphqlPaginatedResponse } from '@admin-cursos/types';

@ObjectType('CategoriesData')
export class GraphqlCategoriesData {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  createdAt: Date;

  @Field()
  isActive: boolean;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt: Date;
}

@ObjectType('CategoriesOutput')
export class GraphqlCategoriesOutput extends GraphqlPaginatedResponse(
  GraphqlCategoriesData
) {}
