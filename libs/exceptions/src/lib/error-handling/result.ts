import { Failure } from './failure';
import { Success } from './success';

export type Result<L, R> = Failure<L, R> | Success<L, R>;
