import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('CoursesOutput')
export class GraphqlCoursesOutput {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  about: string;

  @Field({ nullable: true })
  avatar?: string;
}
