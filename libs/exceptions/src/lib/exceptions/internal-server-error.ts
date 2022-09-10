import { DomainException } from './domain-exception';

export class InternalServerError extends DomainException {
  constructor() {
    super('Aconteceu Algo inesperado. Tente novamente mais tarde');
  }
}
