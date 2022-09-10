import { CategoryRepository } from '../../domain/repositories';
import {
  DuplicatedEntityException,
  EntityNotFoundException,
  fail,
  InternalServerError,
  InvalidIdException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { Category } from '../../domain/entities/category.entity';

export class InMemoryCategoryRepository implements CategoryRepository {
  inMemoryCategories: Category[] = [];

  async findByIdOrFail(
    id: string
  ): Promise<
    Result<
      InternalServerError | EntityNotFoundException | InvalidIdException,
      Category
    >
  > {
    const category = this.inMemoryCategories.find(
      (cateogry) => cateogry.id === id
    );

    if (!category) {
      return fail(new EntityNotFoundException(id, 'category'));
    }

    return succeed(category);
  }

  async save(
    category: Category | Category[]
  ): Promise<Result<InternalServerError | DuplicatedEntityException, void>> {
    if (!Array.isArray(category)) {
      if (
        !this.inMemoryCategories.some(
          (existingCategory) => existingCategory.id === category.id
        )
      ) {
        this.inMemoryCategories.push(category);
      }
    }
    return succeed();
  }
}
