import { CourseProps } from '../../../domain/entities';
import { UpdatedCourse } from './update-course.dto';
import { VoTools } from '@admin-cursos/utils';

export class UpdateCourseMapper {
  static toOutput({
    id,
    categoryId,
    subCategoriesIds,
    duration,
    previewUrl,
    isFree,
    description,
    expertsIds,
    thumbnail,
    title,
    slug,
    releaseDate,
  }: CourseProps & { id: string }): UpdatedCourse {
    return {
      isFree,
      duration,
      previewUrl,
      id,
      categoryId: categoryId.value,
      subCategoriesIds: VoTools.getValueFromMany(subCategoriesIds),
      description,
      expertsIds: VoTools.getValueFromMany(expertsIds),
      thumbnail,
      title,
      slug,
      releaseDate,
    };
  }
}
