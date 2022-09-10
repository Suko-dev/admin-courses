import { ObjectTools } from '@admin-cursos/utils';

export abstract class ValueObject<T = never> {
  protected readonly _value: T;

  protected constructor(value: T) {
    this._value = ObjectTools.deepFreeze(value);
  }

  get value(): T {
    return this._value;
  }

  abstract validate(): boolean;

  toString = (): string => {
    if (typeof this.value !== 'object') {
      try {
        return this.value.toString();
      } catch (e) {
        return this.value + '';
      }
    }
    const value = this.value.toString();
    return value === '[object Object]' ? JSON.stringify(this.value) : value;
  };
}
