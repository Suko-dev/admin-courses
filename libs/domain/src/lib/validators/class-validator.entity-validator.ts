import { EntityValidator, FieldErrors } from './entity-validator';
import { validateSync, ValidationError } from 'class-validator';

export abstract class ClassValidatorEntityValidator extends EntityValidator {
  validate(data): boolean {
    const errors = validateSync(data, { whitelist: true });

    if (errors.length) {
      this._errors = {};
      buildValidationErrors(errors, this._errors);
    }

    return !errors.length;
  }
}

function buildValidationErrors(
  errors: ValidationError[],
  fieldErrors: FieldErrors
): void {
  errors.forEach((error: ValidationError) => {
    const field = error.property;
    if (error.constraints) {
      fieldErrors[field] = Object.values(error.constraints);
    } else {
      if (error.children) {
        fieldErrors[field] = {};
        buildValidationErrors(
          error.children,
          fieldErrors[field] as FieldErrors
        );
      }
    }
  });
}
