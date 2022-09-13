import {
  DuplicatedEntityException,
  EntityNotFoundException,
  InternalServerError,
  InvalidIdException,
  Result,
} from '@admin-cursos/exceptions';
import { SubCategoryViewRepository } from './sub-category-view.repository';
import { SubCategory } from '../../entities/subcategory/sub-category.entity';

export abstract class SubCategoryRepository extends SubCategoryViewRepository {
  abstract save(
    subCategory: SubCategory | SubCategory[]
  ): Promise<Result<InternalServerError | DuplicatedEntityException, void>>;
  abstract findByIdOrFail(
    id: string
  ): Promise<
    Result<
      InternalServerError | EntityNotFoundException | InvalidIdException,
      SubCategory
    >
  >;
}
