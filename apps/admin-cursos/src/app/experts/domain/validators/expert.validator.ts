import { ClassValidatorEntityValidator } from '@admin-cursos/domain';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ExpertProps } from '../entities';

class ExpertValidationProps implements ExpertProps {
  @IsString()
  @IsNotEmpty()
  about: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  avatar?: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  deletedAt: Date | null;

  @IsDate()
  updatedAt: Date;

  constructor(partial: Partial<ExpertProps>) {
    Object.assign(this, partial);
  }
}

export class ExpertValidator extends ClassValidatorEntityValidator {
  validate(data: ExpertProps): boolean {
    const validationProps = new ExpertValidationProps(data);
    return super.validate(validationProps);
  }
}
