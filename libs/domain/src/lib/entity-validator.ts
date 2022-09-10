export type FieldErrors = { [field: string]: string[] };

export abstract class EntityValidator {
  protected _errors: FieldErrors;

  get errors(): FieldErrors {
    return this._errors;
  }

  abstract validate(data: unknown): boolean;
}
