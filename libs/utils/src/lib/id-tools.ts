import { v4 as uuid, validate } from 'uuid';

export class IdTools {
  static generate(): string {
    return uuid();
  }

  static validate(id: string): boolean {
    return validate(id);
  }
}
