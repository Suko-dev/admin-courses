import { CoursesRepository } from '../../domain/repositories';
import {
  DuplicatedEntityException,
  EntityNotFoundException,
  fail,
  InternalServerError,
  InvalidIdException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { Course } from '../../domain/entities';

export class InMemoryCourseRepository implements CoursesRepository {
  inMemoryCourses: Course[] = [];

  async findByIdOrFail(
    id: string
  ): Promise<
    Result<
      InternalServerError | EntityNotFoundException | InvalidIdException,
      Course
    >
  > {
    const course = this.inMemoryCourses.find((course) => course.id === id);

    if (!course) {
      return fail(new EntityNotFoundException(id, 'course'));
    }

    return succeed(course);
  }

  async save(
    course: Course | Course[]
  ): Promise<Result<InternalServerError | DuplicatedEntityException, void>> {
    if (Array.isArray(course)) {
      const backup = this.inMemoryCourses.slice();
      const results = course.map(this.saveSingleCourse, this);
      const anyFailure = results.some((result) => result?.isFailure());
      if (anyFailure) {
        this.inMemoryCourses = backup;
        return fail(new InternalServerError());
      }
    } else {
      const result = this.saveSingleCourse(course);
      if (result?.isFailure()) {
        return fail(result.value);
      }
    }
    return succeed();
  }

  private saveSingleCourse(course): Result<Error, void> {
    this.inMemoryCourses.push(course);
    return succeed();
  }
}
