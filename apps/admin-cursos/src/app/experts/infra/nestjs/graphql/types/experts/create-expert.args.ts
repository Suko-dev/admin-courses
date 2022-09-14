import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('CreateExpertOutput')
export class GraphqlCreateExpertOutput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  about: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field()
  createdAt: Date;
}

@InputType('CreateExpertInput')
export class GraphqlCreateExpertInput {
  @Field()
  name: string;

  @Field()
  about: string;

  @Field({ nullable: true })
  avatar?: string;
}
