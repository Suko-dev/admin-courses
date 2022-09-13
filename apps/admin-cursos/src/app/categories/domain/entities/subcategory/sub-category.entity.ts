import { CoreCategory, CoreCategoryProps } from '../core-category.entity';
import { EntityValidator, UniqueId } from '@admin-cursos/domain';
import {
  fail,
  InvalidParametersException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { SubCategoryValidatorFactory } from '../../validators/sub-category-validator.factory';
import { DateTools } from '@admin-cursos/utils';

export interface SubCategoryProps extends CoreCategoryProps {
  mainCategoryId: UniqueId;
}

export class SubCategory extends CoreCategory<SubCategoryProps> {
  static create(
    props: SubCategoryProps,
    uniqueId?: UniqueId
  ): Result<InvalidParametersException, SubCategory> {
    const subCategory = new SubCategory(props, uniqueId);

    const errors = subCategory.getPropsErrors(subCategory.props);

    if (errors) {
      return fail(new InvalidParametersException(errors));
    }

    return succeed(subCategory);
  }

  get mainCategoryId(): string {
    return this.props.mainCategoryId.value;
  }

  // todo: pensar em generics
  public updateMainCategoryId(
    mainCategoryId: UniqueId
  ): Result<InvalidParametersException, void> {
    const errors = this.getPropsErrors({ ...this.props, mainCategoryId });

    if (errors) {
      return fail(new InvalidParametersException(errors));
    }
    this.props.mainCategoryId = mainCategoryId;
    this.props.updatedAt = DateTools.now();
    return succeed();
  }

  protected getPropsValidator(): EntityValidator {
    return SubCategoryValidatorFactory.create();
  }
}
