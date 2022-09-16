import { CategoriesRepository } from '../../domain/repositories';
import {
  DuplicatedEntityException,
  EntityNotFoundException,
  fail,
  InternalServerError,
  InvalidIdException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { Category } from '../../domain/entities';
import { ListCategoriesView } from '../../domain/dtos/list-categories-view';
import { PaginatedResource } from '@admin-cursos/types';

export class InMemoryCategoryRepository implements CategoriesRepository {
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
    if (Array.isArray(category)) {
      const backup = this.inMemoryCategories.slice();
      const results = category.map(this.saveSingleCategory, this);
      const anyFailure = results.some((result) => result?.isFailure());
      if (anyFailure) {
        this.inMemoryCategories = backup;
        return fail(new InternalServerError());
      }
    } else {
      const result = this.saveSingleCategory(category);
      if (result?.isFailure()) {
        return fail(result.value);
      }
    }
    return succeed();
  }

  public async listPaginatedCategoriesView(
    { page, perPage } = { page: 1, perPage: 10 }
  ): Promise<PaginatedResource<ListCategoriesView>> {
    let firstCategory = page * perPage - perPage;
    if (firstCategory < 0) {
      firstCategory = 0;
    }
    const categories = this.inMemoryCategories.slice(
      firstCategory,
      firstCategory + perPage
    );
    const total = this.inMemoryCategories.length;
    const data = categories.map((category) => ({
      ...category.toJson(),
      isActive: category.isActive,
    }));

    return {
      data,
      meta: {
        currentPage: page > 0 ? page : 1,
        total,
        hasNextPage: page * perPage < total,
        hasPreviousPage: page > 1,
        lastPage: Math.ceil(total / perPage) || 1,
      },
    };
  }

  private saveSingleCategory(category) {
    const duplicatedCode = this.inMemoryCategories.find(
      (existingCategory) => existingCategory.code === category.code
    );

    if (duplicatedCode && duplicatedCode.id !== category.id) {
      return fail(new DuplicatedEntityException());
    } else if (duplicatedCode) {
      const index = this.inMemoryCategories.findIndex(
        (existingCategory) => existingCategory.code === category.code
      );
      this.inMemoryCategories.splice(index, 1, category);
    } else {
      this.inMemoryCategories.push(category);
    }
  }
}
