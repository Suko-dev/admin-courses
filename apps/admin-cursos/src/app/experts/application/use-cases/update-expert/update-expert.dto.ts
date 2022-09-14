import {
  DuplicatedEntityException,
  InternalServerError,
  InvalidParametersException,
  Result,
} from '@admin-cursos/exceptions';

export interface UpdateExpertInput {
  id: string;
  name?: string;
  about?: string;
  avatar?: string;
}

export type UpdateExpertExceptions =
  | InvalidParametersException
  | InternalServerError
  | DuplicatedEntityException;

export type UpdatedExpert = {
  id: string;
  name: string;
  about: string;
  avatar?: string;
  createdAt: Date;
};

export type UpdateExpertOutput = Result<UpdateExpertExceptions, UpdatedExpert>;
