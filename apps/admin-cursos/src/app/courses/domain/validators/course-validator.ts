import {
  ClassValidatorEntityValidator,
  IsUniqueId,
  UniqueId,
} from '@admin-cursos/domain';
import { CourseProps } from '../entities/course/course.entity';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { CourseCanBePublished } from './decorators/published-course.validator';

class CourseValidationProps implements CourseProps {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @Min(1)
  @IsInt()
  @IsOptional()
  duration?: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  previewUrl?: string;

  @Validate(CourseCanBePublished)
  @IsDate()
  @IsOptional()
  releaseDate?: Date;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsBoolean()
  isFree: boolean;

  @Validate(IsUniqueId)
  categoryId: UniqueId;

  @Validate(IsUniqueId, { each: true })
  @IsArray()
  expertsIds: UniqueId[];

  @Validate(IsUniqueId, { each: true })
  @IsArray()
  subCategoriesIds: UniqueId[];

  @IsDate()
  updatedAt: Date;

  @IsDate()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  deletedAt: Date | null;

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
