import { DomainException } from './domain-exception';

export class InvalidIdException extends DomainException {
  constructor() {
    super('id inválido');
  }
}
