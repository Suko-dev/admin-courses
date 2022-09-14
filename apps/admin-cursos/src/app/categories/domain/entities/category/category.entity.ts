import { EntityValidator, UniqueId } from '@admin-cursos/domain';
import {
  fail,
  InvalidParametersException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { CoreCategory, CoreCategoryProps } from '../core-category.entity';
import { CategoryValidatorFactory } from '../../validators/category-validator.factory';
import { DateTools } from '@admin-cursos/utils';
import { UpdateCategoryDto } from '../../dtos/update-category.dto';

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

  public update(
    updateProps: UpdateCategoryDto
  ): Result<InvalidParametersException, void> {
    const errors = this.getPropsErrors({ ...this.props, ...updateProps });

    if (errors) {
      return fail(new InvalidParametersException(errors));
    }
    Object.assign(this.props, updateProps);
    this.props.updatedAt = DateTools.now();
    return succeed();
  }

  protected getPropsValidator(): EntityValidator {
    return CategoryValidatorFactory.create();
  }
}
