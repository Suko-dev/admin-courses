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
import { UpdateSubcategoryDto } from '../../dtos/update-subcategory.dto';

export interface SubCategoryProps extends CoreCategoryProps {
  mainCategoryId: UniqueId;
}

export class SubCategory extends CoreCategory<SubCategoryProps> {
  get mainCategoryId(): string {
    return this.props.mainCategoryId.value;
  }

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

  public update(
    updateProps: UpdateSubcategoryDto
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
    return SubCategoryValidatorFactory.create();
  }
}
