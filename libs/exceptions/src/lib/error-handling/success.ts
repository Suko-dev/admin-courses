import { Result } from './result';
import { Failure } from './failure';

export class Success<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isFailure(): this is Failure<L, R> {
    return false;
  }

  isSuccess(): this is Success<L, R> {
    return true;
  }
}

export const succeed = <L, R>(a?: R): Result<L, R> => {
  return new Success<L, R>(a);
};
