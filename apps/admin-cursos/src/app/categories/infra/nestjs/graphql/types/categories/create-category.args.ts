import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('CreateCategoryOutput')
export class GraphqlCreateCategoryOutput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  createdAt: Date;
}

@InputType('CreateCategoryInput')
export class GraphqlCreateCategoryInput {
  @Field()
  name: string;
}
