import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GraphqlCreateCategoryInput,
  GraphqlCreateCategoryOutput,
} from '../types/create-category';
import { CreateCategoryUseCase } from '../../../../application/use-cases';
import { GraphQLError } from 'graphql';

@Resolver()
export class CategoryResolver {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase) {}

  @Query(() => String)
  foo() {
    return 'Hello World!';
  }

  @Mutation(() => GraphqlCreateCategoryOutput)
  async createCategory(
    @Args('CreateCategoryInput') categoryInput: GraphqlCreateCategoryInput
  ): Promise<GraphqlCreateCategoryOutput> {
    const categoryResult = await this.createCategoryUseCase.execute(
      categoryInput
    );

    if (categoryResult.isSuccess()) {
      return categoryResult.value;
    }

    throw new GraphQLError(categoryResult.value.message, {
      originalError: categoryResult.value,
    });
  }
}
