import {
  DuplicatedEntityException,
  InternalServerError,
  InvalidIdException,
  InvalidParametersException,
  Result,
} from '@admin-cursos/exceptions';

export interface CreateCourseInput {
  title: string;
  categoryId: string;
  expertsIds: string[];
  subCategoriesIds?: string[];
  slug?: string;
  description?: string;
  thumbnail?: string;
  previewUrl?: string;
  isFree?: boolean;
}

export type CreateCourseExceptions =
  | InvalidIdException
  | InvalidParametersException
  | InternalServerError
  | DuplicatedEntityException;

export type CreatedCourse = {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  duration: number;
  subCategoriesIds: string[];
  releaseDate: Date | undefined;
  isFree: boolean;
  thumbnail: string;
  previewUrl: string;
  expertsIds: string[];
  chapters: any[];
};

export type CreateCourseOutput = Result<CreateCourseExceptions, CreatedCourse>;
