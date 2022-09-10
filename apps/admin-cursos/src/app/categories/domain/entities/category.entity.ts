import { AggregatedRoot, FieldErrors, UniqueId } from '@admin-cursos/domain';
import {
  fail,
  InvalidParametersException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { CategoryValidatorFactory } from '../validators/category-validator.factory';
import { DateTools } from '@admin-cursos/utils';

export interface CategoryProps {
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Category extends AggregatedRoot<CategoryProps> {
  private constructor(props: CategoryProps, id?: UniqueId) {
    super(id);
    this.props = props;
  }

  get name(): string {
    return this.props.name;
  }

  get code(): string {
    return this.props.code;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  get deletedAt(): Date {
    return this.props.deletedAt;
  }

  static create(
    props: CategoryProps,
    uniqueId?: UniqueId
  ): Result<InvalidParametersException, Category> {
    const category = new Category(props, uniqueId);

    const errors = category.getPropsErrors(category.props);

    if (errors) {
      return fail(new InvalidParametersException(errors));
    }

    return succeed(category);
  }

  public updateName(name: string): Result<InvalidParametersException, void> {
    const errors = this.getPropsErrors({ ...this.props, name });

    if (errors) {
      return fail(new InvalidParametersException(errors));
    }
    this.props.name = name;

    return succeed();
  }

  public setActive(isActive: boolean): void {
    if (!isActive) {
      this.props.deletedAt = this.props.deletedAt
        ? this.props.deletedAt
        : DateTools.now();
    } else {
      this.props.deletedAt = null;
    }
  }

  private getPropsErrors(props: CategoryProps): FieldErrors | undefined {
    const categoryValidator = CategoryValidatorFactory.create();
    const isValid = categoryValidator.validate(props);

    if (!isValid) {
      return categoryValidator.errors;
    }
  }
}
