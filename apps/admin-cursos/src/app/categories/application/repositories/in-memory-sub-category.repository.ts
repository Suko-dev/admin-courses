import {
  DuplicatedEntityException,
  EntityNotFoundException,
  fail,
  InternalServerError,
  InvalidIdException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { PaginatedResource } from '@admin-cursos/types';
import { SubCategory } from '../../domain/entities';
import { SubCategoriesRepository } from '../../domain/repositories';

export class InMemorySubSubCategoryRepository
  implements SubCategoriesRepository
{
  inMemorySubCategories: SubCategory[] = [];

  async findByIdOrFail(
    id: string
  ): Promise<
    Result<
      InternalServerError | EntityNotFoundException | InvalidIdException,
      SubCategory
    >
  > {
    const subSubCategory = this.inMemorySubCategories.find(
      (cateogry) => cateogry.id === id
    );

    if (!subSubCategory) {
      return fail(new EntityNotFoundException(id, 'subSubCategory'));
    }

    return succeed(subSubCategory);
  }

  async save(
    subSubCategory: SubCategory | SubCategory[]
  ): Promise<Result<InternalServerError | DuplicatedEntityException, void>> {
    if (Array.isArray(subSubCategory)) {
      const backup = this.inMemorySubCategories.slice();
      const results = subSubCategory.map(this.saveSingleSubSubCategory, this);
      const anyFailure = results.some((result) => result?.isFailure());
      if (anyFailure) {
        this.inMemorySubCategories = backup;
        return fail(new InternalServerError());
      }
    } else {
      const result = this.saveSingleSubSubCategory(subSubCategory);
      if (result?.isFailure()) {
        return fail(result.value);
      }
    }
    return succeed();
  }

  public async listPaginatedSubCategoriesView(
    { page, perPage } = { page: 1, perPage: 10 }
  ): Promise<PaginatedResource<any>> {
    let firstSubCategory = page * perPage - perPage;
    if (firstSubCategory < 0) {
      firstSubCategory = 0;
    }
    const categories = this.inMemorySubCategories.slice(
      firstSubCategory,
      firstSubCategory + perPage
    );
    const total = this.inMemorySubCategories.length;
    const data = categories.map((subSubCategory) => ({
      ...subSubCategory.toJson(),
      isActive: subSubCategory.isActive,
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

  private saveSingleSubSubCategory(subSubCategory) {
    const duplicatedCode = this.inMemorySubCategories.find(
      (existingSubCategory) => existingSubCategory.code === subSubCategory.code
    );

    if (duplicatedCode && duplicatedCode.id !== subSubCategory.id) {
      return fail(new DuplicatedEntityException());
    } else if (duplicatedCode) {
      const index = this.inMemorySubCategories.findIndex(
        (existingSubCategory) =>
          existingSubCategory.code === subSubCategory.code
      );
      this.inMemorySubCategories.splice(index, 1, subSubCategory);
    } else {
      this.inMemorySubCategories.push(subSubCategory);
    }
  }
}
