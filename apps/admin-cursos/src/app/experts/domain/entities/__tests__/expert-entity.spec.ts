import { ExpertValidatorFactory } from '../../validators/expert-validator.factory';
import { InvalidParametersException } from '@admin-cursos/exceptions';
import { IdTools } from '@admin-cursos/utils';
import { UniqueId } from '@admin-cursos/domain';
import { Expert, ExpertProps } from '../expert';

let expertProps: ExpertProps;

describe('Expert unit tests', () => {
  const expertValidator = ExpertValidatorFactory.create();
  const expertValidatorSpy = jest.spyOn(expertValidator, 'validate');
  const defaultName = 'A name';

  beforeAll(() => {
    jest
      .spyOn(ExpertValidatorFactory, 'create')
      .mockReturnValue(expertValidator);
    expertValidatorSpy.mockReturnValue(true);
  });

  beforeEach(() => {
    expertProps = {
      about: 'lorem ipsum',
      createdAt: new Date(),
      name: defaultName,
      updatedAt: new Date(),
      deletedAt: null,
    };
  });

  describe('create', () => {
    it('should validate itself', () => {
      // Act
      Expert.create(expertProps);

      // Assert
      expect(expertValidatorSpy).toHaveBeenCalledWith(expertProps);
    });

    describe('when a parameter is invalid', () => {
      const errors = { name: ['must be a string'] };

      beforeEach(() => {
        expertValidatorSpy.mockReturnValueOnce(false);
        expertValidator['_errors'] = errors;
      });

      it('should return a fail result', () => {
        // Act
        const expertResult = Expert.create(expertProps);

        // Assert
        expect(expertResult.isFailure()).toBeTruthy();
      });

      it('should return the validation errors', () => {
        // Arrange

        // Act
        const expertResult = Expert.create(expertProps);

        // Assert
        expect(expertResult.value).toBeInstanceOf(InvalidParametersException);
        expect(expertResult.value).toEqual(
          new InvalidParametersException(errors)
        );
      });
    });

    describe('when all parameters are valid', () => {
      it('should return a new expert', () => {
        // Act
        const expertResult = Expert.create(expertProps);

        // Assert
        expect(expertResult.isSuccess()).toBeTruthy();
        expect(expertResult.value).toBeInstanceOf(Expert);
      });
    });

    describe('when no id is informed', () => {
      it('should create a new valid id', () => {
        // Act
        const expertResult = Expert.create(expertProps);

        // Prepare response
        const id = (<Expert>expertResult.value).id;
        const isValidId = IdTools.validate(id);

        // Assert
        expect(expertResult.isSuccess()).toBeTruthy();
        expect(isValidId).toBeTruthy();
      });
    });

    describe('when an id is informed', () => {
      it('should keep the same id', () => {
        // Arrange
        const uniqueId = UniqueId.create().value as UniqueId;

        // Act
        const expertResult = Expert.create(expertProps, uniqueId);

        // Assert
        expect(expertResult.isSuccess()).toBeTruthy();
        expect((<Expert>expertResult.value).id).toEqual(uniqueId.value);
      });
    });
  });
});
