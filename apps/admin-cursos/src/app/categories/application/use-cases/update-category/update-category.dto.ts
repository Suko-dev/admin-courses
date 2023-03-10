import {
  DuplicatedEntityException,
  InternalServerError,
  InvalidParametersException,
  Result,
} from '@admin-cursos/exceptions';

export interface UpdateCategoryInput {
  id: string;
  name?: string;
  setActiveTo?: boolean;
}

export type UpdateCategoryExceptions =
  | InvalidParametersException
  | InternalServerError
  | DuplicatedEntityException;

export type UpdateCategoryData = {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateCategoryOutput = Result<
  UpdateCategoryExceptions,
  UpdateCategoryData
>;
