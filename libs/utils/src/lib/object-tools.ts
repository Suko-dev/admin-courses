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

  static filterUndefinedKeysOf<T extends object>(object: T): Pick<T, never> {
    return lodashOmit(
      object,
      Object.keys(object).filter((key) => !isDefined(object[key]))
    );
  }

  static omitKeysOf<T extends object>(
    object: T,
    keys: (keyof T)[]
  ): Pick<T, never> {
    return lodashOmit(object, keys);
  }
}
