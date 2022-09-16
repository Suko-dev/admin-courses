import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('CreateCourseOutput')
export class GraphqlCreateCourseOutput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  categoryId: string;

  @Field({ nullable: true })
  duration?: number;

  @Field(() => [String])
  subCategoriesIds: string[];

  @Field(() => Date, { nullable: true })
  releaseDate: Date | undefined;

  @Field()
  isFree: boolean;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field({ nullable: true })
  previewUrl?: string;

  @Field(() => [String])
  expertsIds: string[];

  chapters: any[];
}

@InputType('CreateCourseInput')
export class GraphqlCreateCourseInput {
  @Field()
  title: string;

  @Field()
  categoryId: string;

  @Field(() => [String])
  expertsIds: string[];

  @Field(() => [String], { nullable: true })
  subCategoriesIds?: string[];

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field({ nullable: true })
  previewUrl?: string;

  @Field({ nullable: true })
  isFree?: boolean;
}
