import { SubCategoryProps } from '../../entities';
import { SubCategoryValidator } from '../sub-category.validator';
import { UniqueId } from '@admin-cursos/domain';

describe('CategoryValidator unit test', () => {
  let subCategoryValidator: SubCategoryValidator;
  let validProps: SubCategoryProps;

  beforeEach(() => {
    subCategoryValidator = new SubCategoryValidator();
    validProps = {
      name: 'A name',
      code: 'a_code',
      mainCategoryId: UniqueId.create().value as UniqueId,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
  });

  it('should be defined', () => {
    // Assert
    expect(subCategoryValidator).toBeDefined();
  });

  describe('given a valid props is informed', () => {
    it('should return true', () => {
      // Act
      const isValid = subCategoryValidator.validate(validProps);

      // Assert
      expect(isValid).toBeTruthy();
    });

    it('should has no errors', () => {
      // Act
      subCategoryValidator.validate(validProps);

      // Assert
      expect(subCategoryValidator.errors).not.toBeDefined();
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
      // todo: custom decorator
      // ['mainCategoryId', 'undefined', { mainCategoryId: undefined }],
      // ['mainCategoryId', 'null', { mainCategoryId: null }],
      // ['mainCategoryId', 'not an uuid', { mainCategoryId: 'fake-uuid' }],
    ])('when %s is %s', (_, __, invalidProp) => {
      it('should return false', () => {
        // Arrange
        const invalidProps = Object.assign(validProps, invalidProp);

        // Act
        const isValid = subCategoryValidator.validate(invalidProps);

        // Assert
        expect(isValid).toBeFalsy();
      });
    });
  });
});
