import { v4 as uuid, validate } from 'uuid';

export class IdTools {
  static generateUuid(): string {
    return uuid();
  }

  static validateUuid(id: string): boolean {
    return validate(id);
  }

  static generateObjectId(): string {
    return uuid();
  }

  static validateObjectId(id: string): boolean {
    return validate(id);
  }
}
