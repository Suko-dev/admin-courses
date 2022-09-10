import { ClassValidatorEntityValidator } from '@admin-cursos/domain';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CategoryProps } from '../entities/category.entity';

class CategoryValidationProps {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  @IsDate()
  @IsOptional()
  deletedAt: Date | null;

  constructor(partial: Partial<CategoryValidationProps>) {
    Object.assign(this, partial);
  }
}

export class CategoryValidator extends ClassValidatorEntityValidator {
  validate(data: CategoryProps): boolean {
    const validationProps = new CategoryValidationProps(data);
    return super.validate(validationProps);
  }
}
