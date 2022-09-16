import {
  DuplicatedEntityException,
  EntityNotFoundException,
  InternalServerError,
  InvalidIdException,
  Result,
} from '@admin-cursos/exceptions';
import { CoursesViewRepository } from './courses.view-repository';
import { Course } from '../../entities';

export abstract class CoursesRepository extends CoursesViewRepository {
  abstract save(
    category: Course | Course[]
  ): Promise<Result<InternalServerError | DuplicatedEntityException, void>>;
  abstract findByIdOrFail(
    id: string
  ): Promise<
    Result<
      InternalServerError | EntityNotFoundException | InvalidIdException,
      Course
    >
  >;
}
