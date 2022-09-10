import { CreateCategoryDto } from '../../dtos/create-category.dto';
import { DateTools, IdTools } from '@admin-cursos/utils';
import { CategoryFactory } from '../category.factory';
import { Category } from '../category.entity';
import { categorySlugify } from '../../../utils/category-slugify';
import { InvalidIdException } from '@admin-cursos/exceptions';

describe('CategoryFactory unit tests', () => {
  let completeCreateCategoryDto: CreateCategoryDto;
  const defaultCreationDate = new Date('2022-01-01');
  const defaultUpdatedDate = new Date('2022-01-02');
  const defaultDeletedDate = new Date('2022-01-03');
  const defaultId = IdTools.generate();
  const defaultName = 'A name';
  const defaultCode = `default_code`;

  beforeEach(() => {
    completeCreateCategoryDto = {
      name: defaultName,
      code: defaultCode,
      updatedAt: defaultUpdatedDate,
      createdAt: defaultCreationDate,
      id: defaultId,
      deletedAt: defaultDeletedDate,
    };
  });

  afterEach(jest.resetAllMocks);

  it('should create a category with given params', () => {
    // Act
    const categoryResult = CategoryFactory.create(completeCreateCategoryDto);

    // Assert
    expect(categoryResult.isSuccess()).toBeTruthy();
    expect(categoryResult.value).toBeInstanceOf(Category);
    if (categoryResult.isSuccess()) {
      expect(categoryResult.value.name).toEqual(defaultName);
      expect(categoryResult.value.code).toEqual(defaultCode);
      expect(categoryResult.value.updatedAt).toEqual(defaultUpdatedDate);
      expect(categoryResult.value.createdAt).toEqual(defaultCreationDate);
      expect(categoryResult.value.id).toEqual(defaultId);
      expect(categoryResult.value.deletedAt).toEqual(defaultDeletedDate);
    }
  });

  describe.each([
    ['creation date', 'createdAt'],
    ['update date', 'updatedAt'],
  ])('when creating a category without %s', (_, param) => {
    it(`should set the ${param}`, () => {
      // Arrange
      Object.assign(completeCreateCategoryDto, { [param]: null });
      const creationDate = new Date();
      jest.spyOn(DateTools, 'now').mockReturnValue(creationDate);

      // Act
      const categoryResult = CategoryFactory.create(completeCreateCategoryDto);

      // Assert
      expect(categoryResult.isSuccess()).toBeTruthy();
      expect((<Category>categoryResult.value)[param]).toEqual(creationDate);
    });
  });

  describe('when creating a category without deletion date', () => {
    it('should not set a deletion date', () => {
      // Arrange
      Object.assign(completeCreateCategoryDto, { deletedAt: null });

      // Act
      const categoryResult = CategoryFactory.create(completeCreateCategoryDto);

      // Assert
      expect(categoryResult.isSuccess()).toBeTruthy();
      expect((<Category>categoryResult.value).deletedAt).toBeNull();
    });
  });

  describe('when creating a category without a code', () => {
    it('should generate a valid code', () => {
      // Arrange
      Object.assign(completeCreateCategoryDto, { code: null });

      // Act
      const categoryResult = CategoryFactory.create(completeCreateCategoryDto);

      // Assert
      expect(categoryResult.isSuccess()).toBeTruthy();
      expect((<Category>categoryResult.value).code).toEqual(
        categorySlugify(defaultName)
      );
    });
  });

  describe('when creating a category without an id', () => {
    it('should not generate a new one beforehand', () => {
      // Arrange
      Object.assign(completeCreateCategoryDto, { id: undefined });
      const categoryCreateSpy = jest.spyOn(Category, 'create');

      // Act
      CategoryFactory.create(completeCreateCategoryDto);

      // Assert
      expect(categoryCreateSpy).toHaveBeenCalledWith(
        completeCreateCategoryDto,
        undefined
      );
    });
  });

  describe('when trying to create a category with an invalid id', () => {
    it('should return an InvalidIdException as failure', () => {
      // Arrange
      Object.assign(completeCreateCategoryDto, { id: 'invalid id' });

      // Act
      const categoryResult = CategoryFactory.create(completeCreateCategoryDto);

      // Assert
      expect(categoryResult.isFailure()).toBeTruthy();
      expect(categoryResult.value).toBeInstanceOf(InvalidIdException);
    });
  });
});
