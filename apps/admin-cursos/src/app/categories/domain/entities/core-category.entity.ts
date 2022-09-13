import {
  Entity,
  EntityValidator,
  FieldErrors,
  UniqueId,
} from '@admin-cursos/domain';
import {
  fail,
  InvalidParametersException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { DateTools } from '@admin-cursos/utils';

export interface CoreCategoryProps {
  name: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export abstract class CoreCategory<
  T extends CoreCategoryProps = CoreCategoryProps
> extends Entity<T> {
  protected constructor(props: T, id?: UniqueId) {
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

  get isActive(): boolean {
    return !this.props.deletedAt;
  }

  public updateName(name: string): Result<InvalidParametersException, void> {
    const errors = this.getPropsErrors({ ...this.props, name });

    if (errors) {
      return fail(new InvalidParametersException(errors));
    }
    this.props.name = name;
    this.props.updatedAt = DateTools.now();
    return succeed();
  }

  public setActive(isActive: boolean): void {
    if (!isActive && this.isActive) {
      this.props.deletedAt = DateTools.now();
      this.props.updatedAt = DateTools.now();
    } else if (isActive && !this.isActive) {
      this.props.deletedAt = null;
      this.props.updatedAt = DateTools.now();
    }
  }

  protected getPropsErrors(props: T): FieldErrors | undefined {
    const categoryValidator = this.getPropsValidator();
    const isValid = categoryValidator.validate(props);

    if (!isValid) {
      return categoryValidator.errors;
    }
  }

  protected abstract getPropsValidator(): EntityValidator;
}
