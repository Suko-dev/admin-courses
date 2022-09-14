import {
  DuplicatedEntityException,
  EntityNotFoundException,
  InternalServerError,
  InvalidIdException,
  Result,
} from '@admin-cursos/exceptions';
import { SubCategoriesViewRepository } from './sub-categories.view-repository';
import { SubCategory } from '../../entities';

export abstract class SubCategoriesRepository extends SubCategoriesViewRepository {
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
