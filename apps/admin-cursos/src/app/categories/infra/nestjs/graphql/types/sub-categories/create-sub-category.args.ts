import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('CreateSubCategoryOutput')
export class GraphqlCreateSubCategoryOutput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  mainCategoryId: string;

  @Field()
  createdAt: Date;
}

@InputType('CreateSubCategoryInput')
export class GraphqlCreateSubCategoryInput {
  @Field()
  name: string;

  @Field()
  mainCategoryId: string;
}
