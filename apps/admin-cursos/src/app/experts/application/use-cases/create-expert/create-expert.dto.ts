import {
  DuplicatedEntityException,
  InternalServerError,
  InvalidIdException,
  InvalidParametersException,
  Result,
} from '@admin-cursos/exceptions';

export interface CreateExpertInput {
  name: string;
  about: string;
  avatar?: string;
}

export type CreateExpertExceptions =
  | InvalidIdException
  | InvalidParametersException
  | InternalServerError
  | DuplicatedEntityException;

export type CreatedExpert = {
  id: string;
  name: string;
  about: string;
  avatar?: string;
  createdAt: Date;
};

export type CreateExpertOutput = Result<CreateExpertExceptions, CreatedExpert>;
