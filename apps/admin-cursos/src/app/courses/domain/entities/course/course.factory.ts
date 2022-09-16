import {
  fail,
  InvalidIdException,
  InvalidParametersException,
  Result,
} from '@admin-cursos/exceptions';
import { DateTools } from '@admin-cursos/utils';
import { Course } from './course.entity';
import { CreateCourseDto } from '../../dtos/create-course.dto';
import { courseSlugify } from '../../../utils/course-slugify';
import { convertToUniqueIds } from '../../../utils/convert-course-props-to-unique-id';

export const INVALID_ID_MESSAGE = (param: string): string =>
  `${param} não pode ser convertido para um id único`;

export class CourseFactory {
  static create({
    id,
    createdAt,
    slug,
    updatedAt,
    title,
    deletedAt,
    subCategoriesIds,
    categoryId,
    duration,
    releaseDate,
    isFree,
    thumbnail,
    expertsIds,
    previewUrl,
    description,
    chapters: rawChapters,
  }: CreateCourseDto): Result<
    InvalidParametersException | InvalidIdException,
    Course
  > {
    const [ids, error] = convertToUniqueIds({
      id,
      expertsIds: expertsIds,
      categoryId,
      subCategoriesIds,
    });

    const chapters = rawChapters; //.map(ChapterFactory.create)

    if (error) {
      return fail(error);
    }

    return Course.create(
      {
        title,
        slug: slug ?? courseSlugify(title),
        createdAt: createdAt ?? DateTools.now(),
        updatedAt: updatedAt ?? DateTools.now(),
        deletedAt: deletedAt || null,
        expertsIds: ids.expertsIds,
        categoryId: ids.categoryId,
        subCategoriesIds: ids.subCategoriesIds,
        duration,
        releaseDate,
        isFree: isFree ?? false,
        thumbnail,
        previewUrl,
        description,
        chapters,
      },
      ids.id
    );
  }
}
