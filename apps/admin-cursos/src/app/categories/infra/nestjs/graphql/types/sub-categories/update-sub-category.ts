import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('UpdateSubCategoryOutput')
export class GraphqlUpdateSubCategoryOutput {
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
}

@InputType('UpdateSubCategoryInput')
export class GraphqlUpdateSubCategoryInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  mainCategoryId?: string;
}
