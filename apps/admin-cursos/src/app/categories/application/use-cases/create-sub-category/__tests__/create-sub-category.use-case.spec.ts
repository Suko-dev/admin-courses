import { CreateSubCategoryUseCase } from '../create-sub-category.use-case';
import { SubCategoriesRepository } from '../../../../domain/repositories';
import { CreateSubCategoryInput } from '../create-sub-category.dto';
import { SubCategory, SubCategoryFactory } from '../../../../domain/entities';
import {
  fail,
  InternalServerError,
  InvalidIdException,
  succeed,
} from '@admin-cursos/exceptions';
import SpyInstance = jest.SpyInstance;

describe('CreateSubCategory unit test', () => {
  const createSubCategoryInput: CreateSubCategoryInput = {
    name: 'A name',
    mainCategoryId: 'd7992671-c9fa-435e-a870-8d8577496e54',
  };
  const subCategory = SubCategoryFactory.create(createSubCategoryInput)
    .value as SubCategory;
  const createSubCategorySpy = jest.spyOn(SubCategoryFactory, 'create');
  let createSubCategoryUseCase: CreateSubCategoryUseCase;
  let subCategoryRepositoryMock: SubCategoriesRepository;
  let subCategoryRepositorySaveSpy: SpyInstance;

  beforeAll(() => {
    subCategoryRepositoryMock = {
      save: jest.fn(),
    } as unknown as SubCategoriesRepository;
    subCategoryRepositorySaveSpy = jest.spyOn(
      subCategoryRepositoryMock,
      'save'
    );
  });

  beforeEach(() => {
    createSubCategoryUseCase = new CreateSubCategoryUseCase(
      subCategoryRepositoryMock
    );
    subCategoryRepositorySaveSpy.mockResolvedValue(succeed());
    createSubCategorySpy.mockReturnValue(succeed(subCategory));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when an error occurs while creating a subCategory', () => {
    const error = new InvalidIdException();

    beforeEach(() => {
      createSubCategorySpy.mockReturnValueOnce(fail(error));
    });

    it('should return a failure result', async () => {
      // Act
      const result = await createSubCategoryUseCase.execute(
        createSubCategoryInput
      );

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });

    it('should return the exception', async () => {
      // Act
      const result = await createSubCategoryUseCase.execute(
        createSubCategoryInput
      );

      // Assert
      expect(result.value).toEqual(error);
    });
  });

  describe('when the subCategory has been successfully created', () => {
    it('should return a success result', async () => {
      // Act
      const result = await createSubCategoryUseCase.execute(
        createSubCategoryInput
      );

      // Assert
      expect(result.isSuccess()).toBeTruthy();
    });

    it('should save the new subCategory', async () => {
      // Act
      await createSubCategoryUseCase.execute(createSubCategoryInput);

      // Assert
      expect(subCategoryRepositoryMock.save).toHaveBeenCalledWith(subCategory);
    });

    it('should return the created subCategory', async () => {
      // Act
      const result = await createSubCategoryUseCase.execute(
        createSubCategoryInput
      );

      // Assert
      expect(result.value).toEqual({
        name: subCategory.name,
        id: subCategory.id,
        mainCategoryId: subCategory.mainCategoryId,
        code: subCategory.code,
        createdAt: subCategory.createdAt,
      });
    });

    describe('given error occurs while saving the created subCategory', () => {
      const error = new InternalServerError();

      beforeEach(() => {
        subCategoryRepositorySaveSpy.mockReturnValueOnce(fail(error));
      });

      it('should return a failure result', async () => {
        // Act
        const result = await createSubCategoryUseCase.execute(
          createSubCategoryInput
        );

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return the exception', async () => {
        // Act
        const result = await createSubCategoryUseCase.execute(
          createSubCategoryInput
        );

        // Assert
        expect(result.value).toEqual(error);
      });
    });
  });
});
