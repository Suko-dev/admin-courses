import {
  IsNotEmpty,
  isNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ClassValidatorEntityValidator } from '../';
import { EntityValidator } from '../entity-validator';

class StubValidationProps {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  age?: string;

  constructor(props: Partial<StubValidationProps>) {
    Object.assign(this, props);
  }
}

class StubClassValidatorEntityValidator extends ClassValidatorEntityValidator {}

describe('ClassValidatorEntityValidator unit test', () => {
  let validator: EntityValidator;

  beforeEach(() => {
    validator = new StubClassValidatorEntityValidator();
  });

  describe('validate', () => {
    describe('when a valid prop is informed', () => {
      it('should return true', () => {
        // Arrange
        const props = new StubValidationProps({ name: 'string' });

        // Assert
        const isValid = validator.validate(props);

        // Assert
        expect(isValid).toBeTruthy();
      });
    });

    describe('when the props has errors', () => {
      it('should return false', () => {
        // Arrange
        const props = new StubValidationProps({});

        // Assert
        const isValid = validator.validate(props);

        // Assert
        expect(isValid).toBeFalsy();
      });

      it('should populate the errors', () => {
        // Arrange
        const props = new StubValidationProps({});

        // Assert
        validator.validate(props);

        // Assert
        expect(isNotEmptyObject(validator.errors)).toBeTruthy();
      });

      it('should return all validation errors', () => {
        // Arrange
        const props = new StubValidationProps({ age: '10' });

        // Assert
        validator.validate(props);

        // Assert
        expect(validator.errors).toEqual({
          age: ['age must be a number conforming to the specified constraints'],
          name: ['name should not be empty', 'name must be a string'],
        });
      });
    });
  });
});
