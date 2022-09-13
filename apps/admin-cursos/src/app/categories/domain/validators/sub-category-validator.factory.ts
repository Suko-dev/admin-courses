import { EntityValidator } from '@admin-cursos/domain';
import { SubCategoryValidator } from './sub-category.validator';

export class SubCategoryValidatorFactory {
  static create(): EntityValidator {
    return new SubCategoryValidator();
  }
}
