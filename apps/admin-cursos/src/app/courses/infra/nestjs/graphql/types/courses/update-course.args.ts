import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('UpdateCourseOutput')
export class GraphqlUpdateCourseOutput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  isFree: boolean;

  @Field(() => [String])
  expertsIds: string[];

  @Field()
  categoryId: string;

  @Field(() => [String])
  subCategoriesIds: string[];

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field({ nullable: true })
  previewUrl?: string;

  @Field({ nullable: true })
  duration?: number;

  @Field({ nullable: true })
  releaseDate?: Date;
}

@InputType('UpdateCourseInput')
export class GraphqlUpdateCourseInput {
  @Field()
  id: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  isFree?: boolean;

  @Field(() => [String], { nullable: true })
  expertsIds?: string[];

  @Field(() => [String], { nullable: true })
  subCategoriesIds?: string[];

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field({ nullable: true })
  previewUrl?: string;

  @Field({ nullable: true })
  duration?: number;

  @Field({ nullable: true })
  releaseDate?: Date;
}
