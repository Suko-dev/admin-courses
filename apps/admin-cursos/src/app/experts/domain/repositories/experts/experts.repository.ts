import {
  DuplicatedEntityException,
  EntityNotFoundException,
  InternalServerError,
  InvalidIdException,
  Result,
} from '@admin-cursos/exceptions';
import { ExpertsViewRepository } from './experts.view-repository';
import { Expert } from '../../entities';

export abstract class ExpertsRepository extends ExpertsViewRepository {
  abstract save(
    category: Expert | Expert[]
  ): Promise<Result<InternalServerError | DuplicatedEntityException, void>>;
  abstract findByIdOrFail(
    id: string
  ): Promise<
    Result<
      InternalServerError | EntityNotFoundException | InvalidIdException,
      Expert
    >
  >;
}
