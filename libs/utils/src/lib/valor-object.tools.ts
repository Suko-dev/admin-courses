type ValueObject<T> = {
  value: T;
};

/**
 * utils para serem aplicadas sobre objetos de valor
 */
export class VoTools {
  static getValueFromMany<T>(valueObjects: ValueObject<T>[]): T[] {
    return valueObjects.map((valueObject) => valueObject.value);
  }
}
