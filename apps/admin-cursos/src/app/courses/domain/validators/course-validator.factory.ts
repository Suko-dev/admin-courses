import { EntityValidator } from '@admin-cursos/domain';
import { CourseValidator } from './course-validator';

export class CourseValidatorFactory {
  static create(): EntityValidator {
    return new CourseValidator();
  }
}
