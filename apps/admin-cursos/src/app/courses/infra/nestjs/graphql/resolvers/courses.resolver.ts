import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateCourseUseCase,
  UpdateCourseUseCase,
} from '../../../../application/use-cases';
import { CoursesViewRepository } from '../../../../domain/repositories';
import {
  GraphqlCoursesOutput,
  GraphqlCreateCourseInput,
  GraphqlCreateCourseOutput,
  GraphqlUpdateCourseInput,
  GraphqlUpdateCourseOutput,
} from '../types';

@Resolver()
export class CoursesResolver {
  constructor(
    private readonly createCourseUseCase: CreateCourseUseCase,
    private readonly updateCourseUseCase: UpdateCourseUseCase,
    private readonly coursesViewRepository: CoursesViewRepository
  ) {}

  @Query(() => [GraphqlCoursesOutput])
  async courses(): Promise<void> {
    return;
  }

  @Mutation(() => GraphqlCreateCourseOutput)
  async createCourse(
    @Args('CreateCourseInput') coursesInput: GraphqlCreateCourseInput
  ): Promise<GraphqlCreateCourseOutput> {
    const coursesResult = await this.createCourseUseCase.execute(coursesInput);

    if (coursesResult.isSuccess()) {
      return coursesResult.value;
    }

    throw coursesResult.value;
  }

  @Mutation(() => GraphqlUpdateCourseOutput, { nullable: true })
  async updateCourse(
    @Args('UpdateCourseInput') coursesInput: GraphqlUpdateCourseInput
  ): Promise<GraphqlUpdateCourseOutput> {
    const coursesResult = await this.updateCourseUseCase.execute(coursesInput);

    if (coursesResult.isSuccess()) {
      return coursesResult.value;
    }

    throw coursesResult.value;
  }
}
