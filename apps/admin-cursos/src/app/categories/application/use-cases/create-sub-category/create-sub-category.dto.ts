import {
  DuplicatedEntityException,
  InternalServerError,
  InvalidIdException,
  InvalidParametersException,
  Result,
} from '@admin-cursos/exceptions';

export interface CreateSubCategoryInput {
  name: string;
  mainCategoryId: string;
}

export type CreateSubCategoryExceptions =
  | InvalidIdException
  | InvalidParametersException
  | InternalServerError
  | DuplicatedEntityException;

export type CreatedSubCategory = {
  id: string;
  name: string;
  code: string;
  mainCategoryId: string;
  createdAt: Date;
};

export type CreateSubCategoryOutput = Result<
  CreateSubCategoryExceptions,
  CreatedSubCategory
>;
