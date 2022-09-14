import { EntityValidator } from '@admin-cursos/domain';
import { ExpertValidator } from './expert.validator';

export class ExpertValidatorFactory {
  static create(): EntityValidator {
    return new ExpertValidator();
  }
}
