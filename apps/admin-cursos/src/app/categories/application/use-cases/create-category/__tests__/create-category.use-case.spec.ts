import { CreateCategoryUseCase } from '../create-category.use-case';
import { CategoriesRepository } from '../../../../domain/repositories';
import { CreateCategoryInput } from '../create-category.dto';
import {
  fail,
  InternalServerError,
  InvalidIdException,
  succeed,
} from '@admin-cursos/exceptions';
import { Category, CategoryFactory } from '../../../../domain/entities';
import SpyInstance = jest.SpyInstance;

describe('CreateCategoryUseCase unit test', () => {
  const categoryInput: CreateCategoryInput = { name: 'A name' };
  const category = CategoryFactory.create(categoryInput).value as Category;
  const createCategorySpy = jest.spyOn(CategoryFactory, 'create');
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoryRepositoryMock: CategoriesRepository;
  let categoryRepositorySaveSpy: SpyInstance;

  beforeAll(() => {
    categoryRepositoryMock = {
      save: jest.fn(),
    } as unknown as CategoriesRepository;
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

  describe('when an error occurs while creating a expert', () => {
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

  describe('when the expert has been successfully created', () => {
    it('should return a success result', async () => {
      // Act
      const result = await createCategoryUseCase.execute(categoryInput);

      // Assert
      expect(result.isSuccess()).toBeTruthy();
    });

    it('should save the new expert', async () => {
      // Act
      await createCategoryUseCase.execute(categoryInput);

      // Assert
      expect(categoryRepositoryMock.save).toHaveBeenCalledWith(category);
    });

    it('should return the created expert', async () => {
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

    describe('given error occurs while saving the created expert', () => {
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
