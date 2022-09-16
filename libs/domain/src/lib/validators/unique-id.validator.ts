import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UniqueId } from '../unique-id.vo';

@ValidatorConstraint({ name: 'isUniqueId', async: false })
export class IsUniqueId implements ValidatorConstraintInterface {
  validate(id: unknown) {
    return id instanceof UniqueId;
  }

  defaultMessage(args: ValidationArguments) {
    return `Objeto ${args.value} não é um Identificador Único`;
  }
}
