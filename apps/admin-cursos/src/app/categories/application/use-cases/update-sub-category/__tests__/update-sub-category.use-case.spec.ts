import { SubCategory, SubCategoryFactory } from '../../../../domain/entities';
import { SubCategoryRepository } from '../../../../domain/repositories';
import { UpdateSubCategoryUseCase } from '../update-sub-category.use-case';
import {
  EntityNotFoundException,
  fail,
  InternalServerError,
  InvalidParametersException,
  succeed,
} from '@admin-cursos/exceptions';
import { UpdateSubCategoryInput } from '../update-sub-category.dto';
import { IdTools } from '@admin-cursos/utils';
import SpyInstance = jest.SpyInstance;

describe('UpdateSubCategoryUseCase unit test', () => {
  const updateCategoryInput: UpdateSubCategoryInput = {
    id: IdTools.generate(),
  };
  const initialName = 'A name';
  const subCategory = SubCategoryFactory.create({
    name: initialName,
    mainCategoryId: IdTools.generate(),
  }).value as SubCategory;
  let updateSubCategoryUseCase: UpdateSubCategoryUseCase;
  let subCategoryRepositoryMock: SubCategoryRepository;
  let subCategoryRepositorySaveSpy: SpyInstance;
  let subCategoryRepositoryFindSpy: SpyInstance;

  beforeAll(() => {
    subCategoryRepositoryMock = {
      save: jest.fn(),
      findByIdOrFail: jest.fn(),
    } as unknown as SubCategoryRepository;
    subCategoryRepositoryFindSpy = jest.spyOn(
      subCategoryRepositoryMock,
      'findByIdOrFail'
    );
    subCategoryRepositorySaveSpy = jest.spyOn(
      subCategoryRepositoryMock,
      'save'
    );
  });

  beforeEach(() => {
    updateSubCategoryUseCase = new UpdateSubCategoryUseCase(
      subCategoryRepositoryMock
    );
    subCategoryRepositoryFindSpy.mockResolvedValue(succeed(subCategory));
    subCategoryRepositorySaveSpy.mockResolvedValue(succeed());
  });

  describe('when an error occurs while finding a subCategory', () => {
    const error = new EntityNotFoundException(updateCategoryInput.id);

    beforeEach(() => {
      subCategoryRepositoryFindSpy.mockReturnValueOnce(fail(error));
    });

    it('should return a failure result', async () => {
      // Act
      const result = await updateSubCategoryUseCase.execute(
        updateCategoryInput
      );

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });

    it('should return the exception', async () => {
      // Act
      const result = await updateSubCategoryUseCase.execute(
        updateCategoryInput
      );

      // Assert
      expect(result.value).toEqual(error);
    });
  });

  describe('when a subCategory has been found', () => {
    describe('and the name has to be updated', () => {
      const nameToUpdate = 'Another name';
      const updateCategoryInput = { id: 'An id', name: nameToUpdate };

      it('should change the subCategory name', async () => {
        // Act
        const result = await updateSubCategoryUseCase.execute(
          updateCategoryInput
        );

        // Assert
        expect(result.isSuccess()).toBeTruthy();
        expect(subCategory.name).toEqual(nameToUpdate);
      });

      describe('given an error occurs while updating a subCategory name', () => {
        const error = new InvalidParametersException({
          name: ['must be not empty'],
        });

        beforeEach(() => {
          jest
            .spyOn(subCategory, 'updateName')
            .mockReturnValueOnce(fail(error));
        });

        afterEach(() => {
          jest.restoreAllMocks();
        });

        it('should return a failure result', async () => {
          // Act
          const result = await updateSubCategoryUseCase.execute(
            updateCategoryInput
          );

          // Assert
          expect(result.isFailure()).toBeTruthy();
        });

        it('should return the exception', async () => {
          // Act
          const result = await updateSubCategoryUseCase.execute(
            updateCategoryInput
          );

          // Assert
          expect(result.value).toEqual(error);
        });
      });
    });

    describe('and the mainCategoryId has to be updated', () => {
      const idToUpdate = IdTools.generate();
      const updateCategoryInput: UpdateSubCategoryInput = {
        id: 'An id',
        mainCategoryId: idToUpdate,
      };

      it('should change the subCategory mainCategoryId', async () => {
        // Act
        const result = await updateSubCategoryUseCase.execute(
          updateCategoryInput
        );

        // Assert
        expect(result.isSuccess()).toBeTruthy();
        expect(subCategory.mainCategoryId).toEqual(idToUpdate);
      });

      describe('given an error occurs while updating a subCategory mainCategoryId', () => {
        const error = new InvalidParametersException({
          mainCategoryId: ['must be not empty'],
        });

        beforeEach(() => {
          jest
            .spyOn(subCategory, 'updateMainCategoryId')
            .mockReturnValueOnce(fail(error));
        });

        afterEach(() => {
          jest.restoreAllMocks();
        });

        it('should return a failure result', async () => {
          // Act
          const result = await updateSubCategoryUseCase.execute(
            updateCategoryInput
          );

          // Assert
          expect(result.isFailure()).toBeTruthy();
        });

        it('should return the exception', async () => {
          // Act
          const result = await updateSubCategoryUseCase.execute(
            updateCategoryInput
          );

          // Assert
          expect(result.value).toEqual(error);
        });
      });
    });

    describe('and the activation has to be updated', () => {
      const updateCategoryInput = { id: 'An id', isActive: false };

      it('should change the category activation', async () => {
        // Act
        const result = await updateSubCategoryUseCase.execute(
          updateCategoryInput
        );

        // Assert
        expect(result.isSuccess()).toBeTruthy();
        expect(subCategory.deletedAt).not.toBeNull();
      });
    });

    describe('given the subCategory has been successfully updated', () => {
      it('should return a success result', async () => {
        // Act
        const result = await updateSubCategoryUseCase.execute(
          updateCategoryInput
        );

        // Assert
        expect(result.isSuccess()).toBeTruthy();
      });

      it('should save the updated subCategory', async () => {
        // Act
        await updateSubCategoryUseCase.execute(updateCategoryInput);

        // Assert
        expect(subCategoryRepositoryMock.save).toHaveBeenCalledWith(
          subCategory
        );
      });

      it('should return the updated subCategory', async () => {
        // Act
        const result = await updateSubCategoryUseCase.execute(
          updateCategoryInput
        );

        // Assert
        expect(result.value).toEqual({
          name: subCategory.name,
          id: subCategory.id,
          code: subCategory.code,
          mainCategoryId: subCategory.mainCategoryId,
          isActive: !subCategory.deletedAt,
          createdAt: subCategory.createdAt,
          updatedAt: subCategory.updatedAt,
        });
      });
    });

    describe('when an error occurs while saving the updated subCategory', () => {
      const error = new InternalServerError();

      beforeEach(() => {
        subCategoryRepositorySaveSpy.mockReturnValueOnce(fail(error));
      });

      it('should return a failure result', async () => {
        // Act
        const result = await updateSubCategoryUseCase.execute(
          updateCategoryInput
        );

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return the exception', async () => {
        // Act
        const result = await updateSubCategoryUseCase.execute(
          updateCategoryInput
        );

        // Assert
        expect(result.value).toEqual(error);
      });
    });
  });
});
