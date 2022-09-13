import { CategoryValidator } from '../category.validator';
import { CoreCategoryProps } from '../../entities/core-category.entity';

describe('CategoryValidator unit test', () => {
  let categoryValidator: CategoryValidator;
  let validProps: CoreCategoryProps;

  beforeEach(() => {
    categoryValidator = new CategoryValidator();
    validProps = {
      name: 'A name',
      code: 'a_code',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
  });

  it('should be defined', () => {
    // Assert
    expect(categoryValidator).toBeDefined();
  });

  describe('given a valid props is informed', () => {
    it('should return true', () => {
      // Act
      const isValid = categoryValidator.validate(validProps);

      // Assert
      expect(isValid).toBeTruthy();
    });

    it('should has no errors', () => {
      // Act
      categoryValidator.validate(validProps);

      // Assert
      expect(categoryValidator.errors).not.toBeDefined();
    });
  });

  describe('given an invalid props', () => {
    describe.each([
      ['name', 'an empty string', { name: '' }],
      ['name', 'not a string', { name: 1 }],
      ['name', 'undefined', { name: undefined }],
      ['code', 'an empty string', { code: '' }],
      ['code', 'not a string', { code: 1 }],
      ['code', 'undefined', { code: undefined }],
      ['createdAt', 'undefined', { createdAt: '' }],
      ['createdAt', 'not a date', { createdAt: '10/10/2000' }],
      ['updatedAt', 'undefined', { updatedAt: '' }],
      ['updatedAt', 'not a date', { updatedAt: '10/10/2000' }],
      ['deletedAt', 'not a date', { deletedAt: '10/10/2000' }],
    ])('when %s is %s', (_, __, invalidProp) => {
      it('should return false', () => {
        // Arrange
        const invalidProps = Object.assign(validProps, invalidProp);

        // Act
        const isValid = categoryValidator.validate(invalidProps);

        // Assert
        expect(isValid).toBeFalsy();
      });
    });
  });
});
