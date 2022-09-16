import {
  DuplicatedEntityException,
  InternalServerError,
  InvalidParametersException,
  Result,
} from '@admin-cursos/exceptions';

export interface UpdateCourseInput {
  id: string;
  title?: string;
  description?: string;
  categoryId?: string;
  expertsIds?: string[];
  thumbnail?: string;
  previewUrl?: string;
  duration?: number;
  subCategoriesIds?: string[];
  isFree?: boolean;
}

export type UpdateCourseExceptions =
  | InvalidParametersException
  | InternalServerError
  | DuplicatedEntityException;

export type UpdatedCourse = {
  id: string;
  title: string;
  slug: string;
  isFree: boolean;
  expertsIds: string[];
  categoryId: string;
  subCategoriesIds: string[];
  description?: string;
  thumbnail?: string;
  previewUrl?: string;
  duration?: number;
  releaseDate?: Date;
};

export type UpdateCourseOutput = Result<UpdateCourseExceptions, UpdatedCourse>;
