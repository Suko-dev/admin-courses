import { ClassValidatorEntityValidator } from '@admin-cursos/domain';
import { CourseProps } from '../entities/course/course.entity';
import { Category, SubCategory } from '../../../categories/domain/entities';

class CourseValidationProps implements CourseProps {
  author: string;
  category: Category;
  createdAt: Date;
  deletedAt: Date | null;
  description: string;
  duration: number;
  isFree: boolean;
  previewUrl: string;
  releaseDate: Date;
  subCategories: SubCategory[];
  thumbnail: string;
  title: string;
  updatedAt: Date;

  constructor(partial: Partial<CourseValidationProps>) {
    Object.assign(this, partial);
  }
}

export class CourseValidator extends ClassValidatorEntityValidator {
  validate(data: CourseProps): boolean {
    const validationProps = new CourseValidationProps(data);
    return super.validate(validationProps);
  }
}
