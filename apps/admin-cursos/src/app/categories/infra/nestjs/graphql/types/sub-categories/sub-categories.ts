import { Field, ObjectType } from '@nestjs/graphql';
import { GraphqlPaginatedResponse } from '@admin-cursos/types';

@ObjectType('SubCategoriesData')
export class GraphqlSubCategoriesData {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  mainCategoryId: string;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType('SubCategoriesOutput')
export class GraphqlSubCategoriesOutput extends GraphqlPaginatedResponse(
  GraphqlSubCategoriesData
) {}
