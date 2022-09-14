import {
  DuplicatedEntityException,
  EntityNotFoundException,
  InternalServerError,
  InvalidIdException,
  Result,
} from '@admin-cursos/exceptions';
import { Category } from '../../entities';
import { CategoriesViewRepository } from './categories.view-repository';

export abstract class CategoriesRepository extends CategoriesViewRepository {
  abstract save(
    category: Category | Category[]
  ): Promise<Result<InternalServerError | DuplicatedEntityException, void>>;
  abstract findByIdOrFail(
    id: string
  ): Promise<
    Result<
      InternalServerError | EntityNotFoundException | InvalidIdException,
      Category
    >
  >;
}
