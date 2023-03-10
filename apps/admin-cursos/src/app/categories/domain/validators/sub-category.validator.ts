import {
  ClassValidatorEntityValidator,
  IsUniqueId,
  UniqueId,
} from '@admin-cursos/domain';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { SubCategoryProps } from '../entities';

class CategoryValidationProps implements SubCategoryProps {
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

  @Validate(IsUniqueId)
  mainCategoryId: UniqueId;

  constructor(partial: Partial<CategoryValidationProps>) {
    Object.assign(this, partial);
  }
}

export class SubCategoryValidator extends ClassValidatorEntityValidator {
  validate(data: SubCategoryProps): boolean {
    const validationProps = new CategoryValidationProps(data);
    return super.validate(validationProps);
  }
}
