import { CreateCategoryUseCase } from '../create-category.use-case';
import { CategoryRepository } from '../../../../domain/repositories/category/category.repository';
import { CreateCategoryInput } from '../create-category.dto';
import { CategoryFactory } from '../../../../domain/entities/category.factory';
import {
  fail,
  InternalServerError,
  InvalidIdException,
  succeed,
} from '@admin-cursos/exceptions';
import { Category } from '../../../../domain/entities/category.entity';
import SpyInstance = jest.SpyInstance;

describe('UpdateCategoryUseCase unit test', () => {
  const categoryInput: CreateCategoryInput = { name: 'A name' };
  const category = CategoryFactory.create(categoryInput).value as Category;
  const createCategorySpy = jest.spyOn(CategoryFactory, 'create');
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoryRepositoryMock: CategoryRepository;
  let categoryRepositorySaveSpy: SpyInstance;

  beforeAll(() => {
    categoryRepositoryMock = {
      save: jest.fn(),
    } as unknown as CategoryRepository;
    categoryRepositorySaveSpy = jest.spyOn(categoryRepositoryMock, 'save');
  });

  beforeEach(() => {
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepositoryMock);
    categoryRepositorySaveSpy.mockResolvedValue(succeed());
    createCategorySpy.mockReturnValue(succeed(category));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when an error occurs while creating a category', () => {
    const error = new InvalidIdException();

    beforeEach(() => {
      createCategorySpy.mockReturnValueOnce(fail(error));
    });

    it('should return a failure result', async () => {
      // Act
      const result = await createCategoryUseCase.execute(categoryInput);

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });

    it('should return the exception', async () => {
      // Act
      const result = await createCategoryUseCase.execute(categoryInput);

      // Assert
      expect(result.value).toEqual(error);
    });
  });

  describe('when the category has been successfully created', () => {
    it('should return a success result', async () => {
      // Act
      const result = await createCategoryUseCase.execute(categoryInput);

      // Assert
      expect(result.isSuccess()).toBeTruthy();
    });

    it('should save the new category', async () => {
      // Act
      await createCategoryUseCase.execute(categoryInput);

      // Assert
      expect(categoryRepositoryMock.save).toHaveBeenCalledWith(category);
    });

    it('should return the created category', async () => {
      // Act
      const result = await createCategoryUseCase.execute(categoryInput);

      // Assert
      expect(result.value).toEqual({
        name: category.name,
        id: category.id,
        code: category.code,
        createdAt: category.createdAt,
      });
    });

    describe('given error occurs while saving the created category', () => {
      const error = new InternalServerError();

      beforeEach(() => {
        categoryRepositorySaveSpy.mockReturnValueOnce(fail(error));
      });

      it('should return a failure result', async () => {
        // Act
        const result = await createCategoryUseCase.execute(categoryInput);

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return the exception', async () => {
        // Act
        const result = await createCategoryUseCase.execute(categoryInput);

        // Assert
        expect(result.value).toEqual(error);
      });
    });
  });
});
