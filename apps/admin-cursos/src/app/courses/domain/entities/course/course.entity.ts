import {
  AggregatedRoot,
  EntityValidator,
  UniqueId,
} from '@admin-cursos/domain';
import {
  fail,
  InvalidParametersException,
  Result,
  succeed,
} from '@admin-cursos/exceptions';
import { CourseValidatorFactory } from '../../validators/course-validator.factory';
import { DateTools, ObjectTools } from '@admin-cursos/utils';
import { UpdateCourseDto } from '../../dtos/update-course.dto';

export interface CourseProps {
  title: string;
  slug: string;
  description?: string;
  categoryId: UniqueId;
  expertsIds: UniqueId[];
  thumbnail?: string;
  previewUrl?: string;
  duration?: number;
  subCategoriesIds: UniqueId[];
  isFree: boolean;
  releaseDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  chapters?: any[];
}

export class Course extends AggregatedRoot<CourseProps> {
  private constructor(props: CourseProps, id?: UniqueId) {
    super(id);
    this.props = props;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get categoryId(): string {
    return this.props.categoryId.value;
  }

  get expertsIds(): string[] {
    return this.props.expertsIds.map((expertId) => expertId.value);
  }

  get thumbnail(): string | undefined {
    return this.props.thumbnail;
  }

  get previewUrl(): string | undefined {
    return this.props.previewUrl;
  }

  get duration(): number | undefined {
    return this.props.duration;
  }

  get slug(): string {
    return this.props.slug;
  }

  get subCategoriesIds(): string[] {
    return this.props.subCategoriesIds.map(
      (subcategoryId) => subcategoryId.value
    );
  }

  get isFree(): boolean {
    return this.props.isFree;
  }

  get releaseDate(): Date | undefined {
    return this.props.releaseDate;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get isActive(): boolean {
    return !this.props.deletedAt;
  }

  static create(
    props: CourseProps,
    uniqueId?: UniqueId
  ): Result<InvalidParametersException, Course> {
    const course = new Course(props, uniqueId);

    const errors = course.getPropsErrors(course.props);

    if (errors) {
      return fail(new InvalidParametersException(errors));
    }

    return succeed(course);
  }

  public update(
    updateCourseDto: UpdateCourseDto
  ): Result<InvalidParametersException, void> {
    const propsToUpdate = updateWhiteListFilter(updateCourseDto);

    const errors = this.getPropsErrors({ ...this.props, ...propsToUpdate });

    if (errors) {
      return fail(new InvalidParametersException(errors));
    }
    Object.assign(this.props, propsToUpdate);
    this.props.updatedAt = DateTools.now();
    return succeed();
  }

  public publish(date: Date): Result<InvalidParametersException, void> {
    this.props.releaseDate = date;
    const errors = this.getPropsErrors(this.props);

    if (errors) {
      this.props.releaseDate = undefined;
      return fail(new InvalidParametersException(errors));
    }

    return succeed();
  }

  protected getPropsValidator(): EntityValidator {
    return CourseValidatorFactory.create();
  }
}
// utils
function updateWhiteListFilter({
  title,
  description,
  expertsIds,
  duration,
  subCategoriesIds,
  categoryId,
  thumbnail,
  previewUrl,
  isFree,
}: UpdateCourseDto): UpdateCourseDto {
  return ObjectTools.filterUndefinedKeysOf<UpdateCourseDto>({
    title,
    description,
    expertsIds,
    duration,
    subCategoriesIds,
    categoryId,
    thumbnail,
    previewUrl,
    isFree,
  });
}
