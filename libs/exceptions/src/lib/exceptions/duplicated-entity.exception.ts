import { DomainException } from './domain-exception';

export class DuplicatedEntityException extends DomainException {
  constructor() {
    super('Já existe uma entidade com os parâmetros informados');
  }
}
