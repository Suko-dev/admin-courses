import { ValueObject } from './value-object';
import { IdTools } from '@admin-cursos/utils';
import {
  fail,
  InvalidIdException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';

export class UniqueId extends ValueObject<string> {
  static create(uuid?: string): Result<InvalidIdException, UniqueId> {
    const uniqueId = new UniqueId(uuid ?? IdTools.generate());
    const isValid = uniqueId.validate();
    if (isValid) {
      return succeed(uniqueId);
    }
    return fail(new InvalidIdException());
  }

  validate(): boolean {
    return IdTools.validate(this._value);
  }
}
