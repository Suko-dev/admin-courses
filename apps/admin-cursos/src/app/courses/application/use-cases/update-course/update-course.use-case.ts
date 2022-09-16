import {
  fail,
  InvalidParametersException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { CoursesRepository } from '../../../domain/repositories';
import { UpdateCourseMapper } from './update-course-mapper';
import { UpdateCourseInput, UpdateCourseOutput } from './update-course.dto';
import { isNotEmptyObject } from 'class-validator';
import { convertToUniqueIds } from '../../../utils/convert-course-props-to-unique-id';
import { UpdateCourseDto } from '../../../domain/dtos/update-course.dto';

export class UpdateCourseUseCase {
  constructor(private readonly courseRepository: CoursesRepository) {}

  async execute({
    id,
    ...updateProps
  }: UpdateCourseInput): Promise<UpdateCourseOutput> {
    const courseResult = await this.courseRepository.findByIdOrFail(id);

    if (courseResult.isFailure()) {
      return fail(courseResult.value);
    }

    const course = courseResult.value;

    if (isNotEmptyObject(updateProps)) {
      const parsedPropsResult = this.parseStringsToUniqueIds(updateProps);

      if (parsedPropsResult.isFailure()) {
        return fail(parsedPropsResult.value);
      }

      const result = course.update(parsedPropsResult.value);

      if (result.isFailure()) {
        return fail(result.value);
      }

      const saveResult = await this.courseRepository.save(course);

      if (saveResult.isFailure()) {
        return fail(saveResult.value);
      }
    }

    return succeed(UpdateCourseMapper.toOutput(course.toJson()));
  }

  private parseStringsToUniqueIds({
    expertsIds,
    categoryId,
    subCategoriesIds,
    ...updateCourseInput
  }: Omit<UpdateCourseInput, 'id'>): Result<
    InvalidParametersException,
    UpdateCourseDto
  > {
    const [ids, errors] = convertToUniqueIds({
      expertsIds: expertsIds,
      subCategoriesIds,
      categoryId,
    });

    if (errors) {
      return fail(errors);
    }

    return succeed({
      ...updateCourseInput,
      subCategoriesIds: ids.subCategoriesIds.length
        ? ids.subCategoriesIds
        : undefined,
      categoryId: ids.categoryId,
      expertsIds: ids.expertsIds.length ? ids.expertsIds : undefined,
    });
  }
}
