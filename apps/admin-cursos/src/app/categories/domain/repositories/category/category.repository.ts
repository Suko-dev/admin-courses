import {
  DuplicatedEntityException,
  EntityNotFoundException,
  InternalServerError,
  InvalidIdException,
  Result,
} from '@admin-cursos/exceptions';
import { Category } from '../../entities/category/category.entity';
import { CategoryViewRepository } from './category-view.repository';

export abstract class CategoryRepository extends CategoryViewRepository {
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
