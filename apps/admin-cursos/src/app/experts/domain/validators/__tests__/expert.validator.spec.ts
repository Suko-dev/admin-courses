import { ExpertValidator } from '../expert.validator';
import { ExpertProps } from '../../entities';

describe('ExpertValidator unit test', () => {
  let expertValidator: ExpertValidator;
  let validProps: ExpertProps;

  beforeEach(() => {
    expertValidator = new ExpertValidator();
    validProps = {
      name: 'A name',
      about: 'lorem ipsum',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
  });

  it('should be defined', () => {
    // Assert
    expect(expertValidator).toBeDefined();
  });

  describe('given a valid props is informed', () => {
    it('should return true', () => {
      // Act
      const isValid = expertValidator.validate(validProps);

      // Assert
      expect(isValid).toBeTruthy();
    });

    it('should has no errors', () => {
      // Act
      expertValidator.validate(validProps);

      // Assert
      expect(expertValidator.errors).not.toBeDefined();
    });
  });

  describe('given an invalid props', () => {
    describe.each([
      ['name', 'an empty string', { name: '' }],
      ['name', 'not a string', { name: 1 }],
      ['name', 'undefined', { name: undefined }],
      ['about', 'an empty string', { about: '' }],
      ['about', 'not a string', { about: 1 }],
      ['about', 'undefined', { about: undefined }],
      ['avatar', 'an empty string', { avatar: '' }],
      ['avatar', 'not a string', { avatar: 1 }],
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
        const isValid = expertValidator.validate(invalidProps);

        // Assert
        expect(isValid).toBeFalsy();
      });
    });
  });
});
