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
}
