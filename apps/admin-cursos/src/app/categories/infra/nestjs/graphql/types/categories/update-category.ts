import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('UpdateCategoryOutput')
export class GraphqlUpdateCategoryOutput {
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
}

@InputType('UpdateCategoryInput')
export class GraphqlUpdateCategoryInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  isActive?: boolean;
}
