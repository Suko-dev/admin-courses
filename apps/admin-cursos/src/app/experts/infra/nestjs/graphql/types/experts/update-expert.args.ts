import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('UpdateExpertOutput')
export class GraphqlUpdateExpertOutput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  about: string;

  @Field({ nullable: true })
  avatar?: string;
}

@InputType('UpdateExpertInput')
export class GraphqlUpdateExpertInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  about?: string;
}
