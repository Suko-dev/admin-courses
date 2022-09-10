import { DomainException } from './domain-exception';

export class EntityNotFoundException extends DomainException {
  constructor(id: string, entityName?: string) {
    super(
      `Não foi encontrada nenhuma entidade${
        entityName ? ' de ' + entityName : ''
      } com o id `
    );
  }
}
