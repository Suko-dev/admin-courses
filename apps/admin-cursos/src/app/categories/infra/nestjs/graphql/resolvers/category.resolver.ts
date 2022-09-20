import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GraphqlCreateCategoryInput,
  GraphqlCreateCategoryOutput,
} from '../types/categories/create-category.args';
import {
  CreateCategoryUseCase,
  CreateSubCategoryUseCase,
  UpdateCategoryUseCase,
  UpdateSubCategoryUseCase,
} from '../../../../application/use-cases';
import {
  GraphqlUpdateCategoryInput,
  GraphqlUpdateCategoryOutput,
} from '../types/categories/update-category';
import {
  CategoriesViewRepository,
  SubCategoriesViewRepository,
} from '../../../../domain/repositories';
import { GraphqlCategoriesOutput } from '../types/categories/categories';
import { GraphqlPaginationInput } from '@admin-cursos/types';
import { GraphqlSubCategoriesOutput } from '../types/sub-categories/sub-categories';
import {
  GraphqlCreateSubCategoryInput,
  GraphqlCreateSubCategoryOutput,
} from '../types/sub-categories/create-sub-category.args';
import {
  GraphqlUpdateSubCategoryInput,
  GraphqlUpdateSubCategoryOutput,
} from '../types/sub-categories/update-sub-category';

@Resolver()
export class CategoryResolver {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly categoryViewRepository: CategoriesViewRepository,
    private readonly createSubCategoryUseCase: CreateSubCategoryUseCase,
    private readonly updateSubCategoryUseCase: UpdateSubCategoryUseCase,
    private readonly subCategoryViewRepository: SubCategoriesViewRepository
  ) {}

  @Query(() => GraphqlCategoriesOutput, { name: 'v1_categories' })
  async categories(
    @Args('PaginationInput', { nullable: true, name: 'v1_categories' })
    paginationInput: GraphqlPaginationInput
  ): Promise<GraphqlCategoriesOutput> {
    return await this.categoryViewRepository.listPaginatedCategoriesView(
      paginationInput
    );
  }

  @Mutation(() => GraphqlCreateCategoryOutput, { name: 'v1_createCategory' })
  async createCategory(
    @Args('CreateCategoryInput') categoryInput: GraphqlCreateCategoryInput
  ): Promise<GraphqlCreateCategoryOutput> {
    const categoryResult = await this.createCategoryUseCase.execute(
      categoryInput
    );

    if (categoryResult.isSuccess()) {
      return categoryResult.value;
    }

    throw categoryResult.value;
  }

  @Mutation(() => GraphqlUpdateCategoryOutput, {
    nullable: true,
    name: 'v1_updateCategory',
  })
  async updateCategory(
    @Args('UpdateCategoryInput') categoryInput: GraphqlUpdateCategoryInput
  ): Promise<GraphqlUpdateCategoryOutput> {
    const categoryResult = await this.updateCategoryUseCase.execute(
      categoryInput
    );

    if (categoryResult.isSuccess()) {
      return categoryResult.value;
    }

    throw categoryResult.value;
  }

  @Query(() => GraphqlSubCategoriesOutput)
  async subCategories(
    @Args('PaginationInput', { nullable: true })
    paginationInput: GraphqlPaginationInput
  ): Promise<GraphqlSubCategoriesOutput> {
    return await this.subCategoryViewRepository.listPaginatedSubCategoriesView(
      paginationInput
    );
  }

  @Mutation(() => GraphqlCreateSubCategoryOutput, {
    name: 'v1_createSubCategory',
  })
  async createSubCategory(
    @Args('CreateSubCategoryInput')
    createSubCategoryInput: GraphqlCreateSubCategoryInput
  ): Promise<GraphqlCreateSubCategoryOutput> {
    const subCategoryResult = await this.createSubCategoryUseCase.execute(
      createSubCategoryInput
    );

    if (subCategoryResult.isSuccess()) {
      return subCategoryResult.value;
    }

    throw subCategoryResult.value;
  }

  @Mutation(() => GraphqlUpdateSubCategoryOutput, {
    nullable: true,
    name: 'v1_updateSubCategory',
  })
  async updateSubCategory(
    @Args('UpdateSubCategoryInput')
    updateSubCategoryInput: GraphqlUpdateSubCategoryInput
  ): Promise<GraphqlUpdateSubCategoryOutput> {
    const categoryResult = await this.updateSubCategoryUseCase.execute(
      updateSubCategoryInput
    );

    if (categoryResult.isSuccess()) {
      return categoryResult.value;
    }

    throw categoryResult.value;
  }
}
