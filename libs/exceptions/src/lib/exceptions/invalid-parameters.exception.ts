import { DomainException } from './domain-exception';

export class InvalidParametersException extends DomainException {
  constructor(invalidParams: Record<string, string[]>) {
    super(JSON.stringify(invalidParams));
  }
}
