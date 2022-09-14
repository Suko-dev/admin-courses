import { Category } from '../category';
import { CategoryValidatorFactory } from '../../validators/category-validator.factory';
import { InvalidParametersException } from '@admin-cursos/exceptions';
import { DateTools, IdTools } from '@admin-cursos/utils';
import { UniqueId } from '@admin-cursos/domain';
import { CoreCategoryProps } from '../core-category.entity';

let categoryProps: CoreCategoryProps;

describe('Category unit tests', () => {
  const categoryValidator = CategoryValidatorFactory.create();
  const categoryValidatorSpy = jest.spyOn(categoryValidator, 'validate');
  const defaultName = 'A name';

  beforeAll(() => {
    jest
      .spyOn(CategoryValidatorFactory, 'create')
      .mockReturnValue(categoryValidator);
    categoryValidatorSpy.mockReturnValue(true);
  });

  beforeEach(() => {
    categoryProps = {
      code: 'a_code',
      createdAt: new Date(),
      name: defaultName,
      updatedAt: new Date(),
      deletedAt: null,
    };
  });

  describe('create', () => {
    it('should validate itself', () => {
      // Act
      Category.create(categoryProps);

      // Assert
      expect(categoryValidatorSpy).toHaveBeenCalledWith(categoryProps);
    });

    describe('when a parameter is invalid', () => {
      const errors = { name: ['must be a string'] };

      beforeEach(() => {
        categoryValidatorSpy.mockReturnValueOnce(false);
        categoryValidator['_errors'] = errors;
      });

      it('should return a fail result', () => {
        // Act
        const categoryResult = Category.create(categoryProps);

        // Assert
        expect(categoryResult.isFailure()).toBeTruthy();
      });

      it('should return the validation errors', () => {
        // Arrange

        // Act
        const categoryResult = Category.create(categoryProps);

        // Assert
        expect(categoryResult.value).toBeInstanceOf(InvalidParametersException);
        expect(categoryResult.value).toEqual(
          new InvalidParametersException(errors)
        );
      });
    });

    describe('when all parameters are valid', () => {
      it('should return a new expert', () => {
        // Act
        const categoryResult = Category.create(categoryProps);

        // Assert
        expect(categoryResult.isSuccess()).toBeTruthy();
        expect(categoryResult.value).toBeInstanceOf(Category);
      });
    });

    describe('when no id is informed', () => {
      it('should create a new valid id', () => {
        // Act
        const categoryResult = Category.create(categoryProps);

        // Prepare response
        const id = (<Category>categoryResult.value).id;
        const isValidId = IdTools.validate(id);

        // Assert
        expect(categoryResult.isSuccess()).toBeTruthy();
        expect(isValidId).toBeTruthy();
      });
    });

    describe('when an id is informed', () => {
      it('should keep the same id', () => {
        // Arrange
        const uniqueId = UniqueId.create().value as UniqueId;

        // Act
        const categoryResult = Category.create(categoryProps, uniqueId);

        // Assert
        expect(categoryResult.isSuccess()).toBeTruthy();
        expect((<Category>categoryResult.value).id).toEqual(uniqueId.value);
      });
    });
  });

  describe('updateName', () => {
    let category: Category;

    beforeEach(() => {
      category = createCategory();
    });

    it('should validate itself', () => {
      // Act
      category.update({ name: 'A name' });

      // Assert
      expect(categoryValidatorSpy).toHaveBeenCalledWith(categoryProps);
    });

    describe('when the new name is invalid', () => {
      const errors = { name: ['must be a string'] };

      beforeEach(() => {
        categoryValidatorSpy.mockReturnValueOnce(false);
        categoryValidator['_errors'] = errors;
      });

      it('should return a fail result', () => {
        // Act
        const result = category.update({ name: '' });

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return the validation errors', () => {
        // Act
        const result = category.update({ name: '' });

        // Assert
        expect(result.value).toEqual(new InvalidParametersException(errors));
      });

      it('should not alter its name', () => {
        // Act
        category.update({ name: '' });

        // Assert
        expect(category.name).toEqual(defaultName);
      });
    });

    describe('when name are valid', () => {
      it('should return a success result', () => {
        // Act
        const result = category.update({ name: 'Another name' });

        // Assert
        expect(result.isSuccess()).toBeTruthy();
      });

      it('should update its name', () => {
        // Arrange
        const nameToUpdate = 'Another name';

        // Act
        category.update({ name: nameToUpdate });

        // Assert
        expect(category.name).toEqual(nameToUpdate);
      });
    });
  });

  describe('setActivation', () => {
    describe('when setting active to true', () => {
      it('should define the deletedAt field to null', () => {
        // Arrange
        const category = createCategory({ deletedAt: new Date('2022-01-01') });

        // Act
        category.activate();

        // Assert
        expect(category.deletedAt).toBeNull();
      });
    });

    describe('when setting active to false', () => {
      describe('given the expert is active', () => {
        it('should set a deletedAt date', () => {
          // Arrange
          const category = createCategory();
          const deletedAt = new Date();
          jest.spyOn(DateTools, 'now').mockReturnValueOnce(deletedAt);

          // Act
          category.deactivate();

          // Assert
          expect(category.deletedAt).not.toBeNull();
          expect(category.deletedAt).toEqual(deletedAt);
        });
      });

      describe('given the expert is already inactive', () => {
        it('should do nothing', () => {
          // Arrange
          const deletedAt = new Date('2022-01-01');
          const category = createCategory({
            deletedAt,
          });

          // Act
          category.deactivate();

          // Assert
          expect(category.deletedAt).toEqual(deletedAt);
        });
      });
    });
  });
});
// factories
function createCategory(props: Partial<CoreCategoryProps> = {}): Category {
  const categoryResult = Category.create({ ...categoryProps, ...props });
  return categoryResult.value as Category;
}
