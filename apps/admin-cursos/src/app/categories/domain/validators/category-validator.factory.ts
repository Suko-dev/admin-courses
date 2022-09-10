import { EntityValidator } from '@admin-cursos/domain';
import { CategoryValidator } from './category.validator';

export class CategoryValidatorFactory {
  static create(): EntityValidator {
    return new CategoryValidator();
  }
}
