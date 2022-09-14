import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('ExpertsOutput')
export class GraphqlExpertsOutput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  about: string;

  @Field({ nullable: true })
  avatar?: string;
}
