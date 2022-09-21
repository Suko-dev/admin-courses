import { DomainException } from '../../exceptions';

export class GraphqlErrorHandler {
  static handle<T extends DomainException>(exception: T): never {
    throw exception; // todo: personalizar erro
  }
}
