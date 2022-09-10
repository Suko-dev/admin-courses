import { CategoryFactory } from '../../../../domain/entities/category.factory';
import { Category } from '../../../../domain/entities/category.entity';
import { CategoryRepository } from '../../../../domain/repositories/category/category.repository';
import { UpdateCategoryUseCase } from '../update-category.use-case';
import {
  EntityNotFoundException,
  fail,
  InternalServerError,
  InvalidParametersException,
  succeed,
} from '@admin-cursos/exceptions';
import { UpdateCategoryInput } from '../update-category.dto';
import SpyInstance = jest.SpyInstance;

describe('UpdateCategoryUseCase unit test', () => {
  const updateCategoryInput: UpdateCategoryInput = { id: 'An id' };
  const initialName = 'A name';
  const category = CategoryFactory.create({ name: initialName })
    .value as Category;
  let updateCategoryUseCase: UpdateCategoryUseCase;
  let categoryRepositoryMock: CategoryRepository;
  let categoryRepositorySaveSpy: SpyInstance;
  let categoryRepositoryFindSpy: SpyInstance;

  beforeAll(() => {
    categoryRepositoryMock = {
      save: jest.fn(),
      findByIdOrFail: jest.fn(),
    } as CategoryRepository;
    categoryRepositoryFindSpy = jest.spyOn(
      categoryRepositoryMock,
      'findByIdOrFail'
    );
    categoryRepositorySaveSpy = jest.spyOn(categoryRepositoryMock, 'save');
  });

  beforeEach(() => {
    updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepositoryMock);
    categoryRepositoryFindSpy.mockResolvedValue(succeed(category));
    categoryRepositorySaveSpy.mockResolvedValue(succeed());
  });

  describe('when an error occurs while finding a category', () => {
    const error = new EntityNotFoundException(updateCategoryInput.id);

    beforeEach(() => {
      categoryRepositoryFindSpy.mockReturnValueOnce(fail(error));
    });

    it('should return a failure result', async () => {
      // Act
      const result = await updateCategoryUseCase.execute(updateCategoryInput);

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });

    it('should return the exception', async () => {
      // Act
      const result = await updateCategoryUseCase.execute(updateCategoryInput);

      // Assert
      expect(result.value).toEqual(error);
    });
  });

  describe('when a category has been found', () => {
    describe('and the name has to be updated', () => {
      const nameToUpdate = 'Another name';
      const updateCategoryInput = { id: 'An id', name: nameToUpdate };

      it('should change the category name', async () => {
        // Act
        const result = await updateCategoryUseCase.execute(updateCategoryInput);

        // Assert
        expect(result.isSuccess()).toBeTruthy();
        expect(category.name).toEqual(nameToUpdate);
      });

      describe('given an error occurs while updating a category name', () => {
        const error = new InvalidParametersException({
          name: ['must be not empty'],
        });

        beforeEach(() => {
          jest.spyOn(category, 'updateName').mockReturnValueOnce(fail(error));
        });

        afterEach(() => {
          jest.restoreAllMocks();
        });

        it('should return a failure result', async () => {
          // Act
          const result = await updateCategoryUseCase.execute(
            updateCategoryInput
          );

          // Assert
          expect(result.isFailure()).toBeTruthy();
        });

        it('should return the exception', async () => {
          // Act
          const result = await updateCategoryUseCase.execute(
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
        const result = await updateCategoryUseCase.execute(updateCategoryInput);

        // Assert
        expect(result.isSuccess()).toBeTruthy();
        expect(category.deletedAt).not.toBeNull();
      });
    });

    describe('given the category has been successfully updated', () => {
      it('should return a success result', async () => {
        // Act
        const result = await updateCategoryUseCase.execute(updateCategoryInput);

        // Assert
        expect(result.isSuccess()).toBeTruthy();
      });

      it('should save the updated category', async () => {
        // Act
        await updateCategoryUseCase.execute(updateCategoryInput);

        // Assert
        expect(categoryRepositoryMock.save).toHaveBeenCalledWith(category);
      });

      it('should return the updated category', async () => {
        // Act
        const result = await updateCategoryUseCase.execute(updateCategoryInput);

        // Assert
        expect(result.value).toEqual({
          name: category.name,
          id: category.id,
          code: category.code,
          isActive: !category.deletedAt,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt,
          deletedAt: category.deletedAt,
        });
      });
    });

    describe('when an error occurs while saving the updated category', () => {
      const error = new InternalServerError();

      beforeEach(() => {
        categoryRepositorySaveSpy.mockReturnValueOnce(fail(error));
      });

      it('should return a failure result', async () => {
        // Act
        const result = await updateCategoryUseCase.execute(updateCategoryInput);

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return the exception', async () => {
        // Act
        const result = await updateCategoryUseCase.execute(updateCategoryInput);

        // Assert
        expect(result.value).toEqual(error);
      });
    });
  });
});
