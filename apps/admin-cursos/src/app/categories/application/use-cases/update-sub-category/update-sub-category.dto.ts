import {
  DuplicatedEntityException,
  InternalServerError,
  InvalidParametersException,
  Result,
} from '@admin-cursos/exceptions';

export interface UpdateSubCategoryInput {
  id: string;
  name?: string;
  setActiveTo?: boolean;
  mainCategoryId?: string;
}

export type UpdateSubCategoryExceptions =
  | InvalidParametersException
  | InternalServerError
  | DuplicatedEntityException;

export type UpdatedSubcategory = {
  id: string;
  name: string;
  code: string;
  mainCategoryId: string;
  isActive: boolean;
};

export type UpdateSubCategoryOutput = Result<
  UpdateSubCategoryExceptions,
  UpdatedSubcategory
>;
