import { EntityValidator } from './entity-validator';
import { validateSync } from 'class-validator';

export abstract class ClassValidatorEntityValidator extends EntityValidator {
  validate(data): boolean {
    const errors = validateSync(data);

    if (errors.length) {
      this._errors = {};
      errors.forEach((error) => {
        const field = error.property;
        this._errors[field] = Object.values(error.constraints);
      });
    }

    return !errors.length;
  }
}
