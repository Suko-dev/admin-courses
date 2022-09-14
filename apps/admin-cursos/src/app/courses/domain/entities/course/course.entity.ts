import {
  AggregatedRoot,
  EntityValidator,
  FieldErrors,
  UniqueId,
} from '@admin-cursos/domain';
import { Category, SubCategory } from '../../../../categories/domain/entities';
import {
  fail,
  InvalidParametersException,
  succeed,
} from '@admin-cursos/exceptions';
import { CourseValidatorFactory } from '../../validators/course-validator.factory';

export interface CourseProps {
  title: string;
  description: string;
  category: Category;
  author: string; //Expert;
  thumbnail: string;
  previewUrl: string;
  duration: number;
  subCategories: SubCategory[];
  isFree: boolean;
  releaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Course extends AggregatedRoot<CourseProps> {
  private constructor(props: CourseProps, id?: UniqueId) {
    super(id);
    this.props = props;
  }

  static create(props: CourseProps, uniqueId?: UniqueId) {
    const category = new Course(props, uniqueId);

    const errors = category.getPropsErrors(category.props);

    if (errors) {
      return fail(new InvalidParametersException(errors));
    }

    return succeed(category);
  }

  protected getPropsErrors(props: CourseProps): FieldErrors | undefined {
    const courseValidator: EntityValidator = CourseValidatorFactory.create();
    const isValid = courseValidator.validate(props);

    if (!isValid) {
      return courseValidator.errors;
    }
  }
}
