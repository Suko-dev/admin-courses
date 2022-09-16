import { CreateCourseInput, CreateCourseOutput } from './create-course.dto';
import { fail, succeed } from '@admin-cursos/exceptions';
import { CoursesRepository } from '../../../domain/repositories';
import { CreateCourseMapper } from './create-course-mapper';
import { CourseFactory } from '../../../domain/entities';

export class CreateCourseUseCase {
  constructor(private readonly courseRepository: CoursesRepository) {}

  async execute(
    createCourseInput: CreateCourseInput
  ): Promise<CreateCourseOutput> {
    const courseResult = CourseFactory.create(createCourseInput);

    if (courseResult.isFailure()) {
      return fail(courseResult.value);
    }

    const course = courseResult.value;
    const saveResult = await this.courseRepository.save(course);

    if (saveResult.isFailure()) {
      return fail(saveResult.value);
    }

    return succeed(CreateCourseMapper.toOutput(course.toJson()));
  }
}
