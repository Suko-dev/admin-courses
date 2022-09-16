import {
  isDefined,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CourseProps } from '../../entities/course/course.entity';

@ValidatorConstraint({ name: 'canBePublished', async: false })
export class CourseCanBePublished implements ValidatorConstraintInterface {
  validate(releaseDate: Date, args: ValidationArguments): boolean {
    if (isDefined(releaseDate)) {
      const course = args.object as CourseProps;
      return (
        isDefined(course.thumbnail) &&
        isDefined(course.previewUrl) &&
        isDefined(course.duration) &&
        isDefined(course.description)
        // && isDefined(course.chapters)
      );
    }
    return true;
  }

  defaultMessage(): string {
    return (
      'Um curso publicado precisa ter todas suas propriedades definidas ' +
      '(thumbnail, previewUrl, duration, description, chapters e lessons)'
    );
  }
}
