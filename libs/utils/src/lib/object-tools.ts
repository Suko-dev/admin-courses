import { omit as lodashOmit } from 'lodash';
import { isDefined } from 'class-validator';

export class ObjectTools {
  static deepFreeze<T>(object: T) {
    const keys = Object.getOwnPropertyNames(object);
    for (const key of keys) {
      const value = object[key];
      if (value && typeof value === 'object') {
        this.deepFreeze(value);
      }
    }

    return Object.freeze(object);
  }

  static filterUndefinedKeysOf<T>(object: T): T {
    return lodashOmit(
      object,
      Object.keys(object).filter((key) => !isDefined(object[key]))
    );
  }
}
