import {
  DuplicatedEntityException,
  InternalServerError,
  InvalidIdException,
  InvalidParametersException,
  Result,
} from '@admin-cursos/exceptions';

export interface CreateCategoryInput {
  name: string;
}

export type CreateCategoryExceptions =
  | InvalidIdException
  | InvalidParametersException
  | InternalServerError
  | DuplicatedEntityException;

export type CreateCategoryOutput = Result<
  CreateCategoryExceptions,
  {
    id: string;
    name: string;
    code: string;
    createdAt: Date;
  }
>;
