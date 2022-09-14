import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './create-category.dto';
import { fail, succeed } from '@admin-cursos/exceptions';
import { CategoriesRepository } from '../../../domain/repositories';
import { CreateCategoryMapper } from './create-category-mapper';
import { CategoryFactory } from '../../../domain/entities';

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: CategoriesRepository) {}

  async execute(
    categoryInput: CreateCategoryInput
  ): Promise<CreateCategoryOutput> {
    const categoryResult = CategoryFactory.create(categoryInput);

    if (categoryResult.isFailure()) {
      return categoryResult;
    }

    const category = categoryResult.value;
    const saveResult = await this.categoryRepository.save(category);

    if (saveResult.isFailure()) {
      return fail(saveResult.value);
    }

    return succeed(CreateCategoryMapper.toOutput(category.toJson()));
  }
}
