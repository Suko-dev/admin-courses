import { CourseProps } from '../../../domain/entities';
import { CreatedCourse } from './create-course.dto';
import { VoTools } from '@admin-cursos/utils';

export class CreateCourseMapper {
  static toOutput({
    id,
    subCategoriesIds,
    categoryId,
    duration,
    releaseDate,
    isFree,
    thumbnail,
    previewUrl,
    description,
    chapters,
    expertsIds,
    title,
  }: Required<CourseProps & { id: string }>): CreatedCourse {
    return {
      id,
      subCategoriesIds: VoTools.getValueFromMany(subCategoriesIds),
      categoryId: categoryId.value,
      duration,
      releaseDate,
      isFree,
      thumbnail,
      previewUrl,
      description,
      chapters,
      expertsIds: VoTools.getValueFromMany(expertsIds),
      title,
    };
  }
}
