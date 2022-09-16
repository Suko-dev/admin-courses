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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.value.toString();
      } catch (e) {
        return this.value + '';
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = this.value.toString();
    return value === '[object Object]' ? JSON.stringify(this.value) : value;
  };
}
