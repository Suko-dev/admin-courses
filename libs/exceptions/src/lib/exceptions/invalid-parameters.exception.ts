import { DomainException } from './domain-exception';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type InvalidParams = Record<string, string[] | InvalidParams>;

export class InvalidParametersException extends DomainException {
  constructor(invalidParams: InvalidParams) {
    super(JSON.stringify(invalidParams));
  }
}
