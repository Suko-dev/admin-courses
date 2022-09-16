import { UniqueId } from '@admin-cursos/domain';

export class UpdateCourseDto {
  title?: string;
  description?: string;
  categoryId?: UniqueId;
  expertsIds?: UniqueId[];
  thumbnail?: string;
  previewUrl?: string;
  duration?: number;
  subCategoriesIds?: UniqueId[];
  isFree?: boolean;
}
