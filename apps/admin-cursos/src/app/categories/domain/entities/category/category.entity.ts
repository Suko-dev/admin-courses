import { EntityValidator, UniqueId } from '@admin-cursos/domain';
import {
  fail,
  InvalidParametersException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { CoreCategory, CoreCategoryProps } from '../core-category.entity';
import { CategoryValidatorFactory } from '../../validators/category-validator.factory';

export class Category extends CoreCategory {
  static create(
    props: CoreCategoryProps,
    uniqueId?: UniqueId
  ): Result<InvalidParametersException, Category> {
    const category = new Category(props, uniqueId);

    const errors = category.getPropsErrors(category.props);

    if (errors) {
      return fail(new InvalidParametersException(errors));
    }

    return succeed(category);
  }

  protected getPropsValidator(): EntityValidator {
    return CategoryValidatorFactory.create();
  }
}
