import { Success } from './success';
import { Result } from './result';

export class Failure<L, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isFailure(): this is Failure<L, R> {
    return true;
  }

  isSuccess(): this is Success<L, R> {
    return false;
  }
}

export const fail = <L, R>(l: L): Result<L, R> => {
  return new Failure(l);
};
