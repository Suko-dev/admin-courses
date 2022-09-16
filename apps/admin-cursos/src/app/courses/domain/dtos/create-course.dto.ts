export interface CreateCourseDto {
  id?: string;
  title: string;
  categoryId: string;
  expertsIds: string[];
  subCategoriesIds?: string[];
  slug?: string;
  description?: string;
  thumbnail?: string;
  previewUrl?: string;
  duration?: number;
  isFree?: boolean;
  releaseDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  chapters?: any[];
}
