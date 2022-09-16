import { DateTools, IdTools } from '@admin-cursos/utils';
import { fail, InvalidIdException, succeed } from '@admin-cursos/exceptions';
import { CreateSubCategoryDto } from '../../dtos/create-sub-category.dto';
import { SubCategory, SubCategoryFactory } from '../sub-category';
import { subCategorySlugify } from '../../../utils/sub-category-slugify';
import { UniqueId } from '@admin-cursos/domain';

describe('SubSubCategoryFactory unit tests', () => {
  let completeCreateSubCategoryDto: CreateSubCategoryDto;
  const defaultCreationDate = new Date('2022-01-01');
  const defaultUpdatedDate = new Date('2022-01-02');
  const defaultDeletedDate = new Date('2022-01-03');
  const defaultId = IdTools.generateUuid();
  const defaultName = 'A name';
  const defaultCode = `default_code`;
  const mainCategoryId = UniqueId.create(defaultId).value as UniqueId;

  beforeEach(() => {
    jest.spyOn(UniqueId, 'create').mockReturnValue(succeed(mainCategoryId));

    completeCreateSubCategoryDto = {
      name: defaultName,
      code: defaultCode,
      mainCategoryId: defaultId,
      updatedAt: defaultUpdatedDate,
      createdAt: defaultCreationDate,
      id: defaultId,
      deletedAt: defaultDeletedDate,
    };
  });

  afterEach(jest.resetAllMocks);

  it('should create a subCategory with given params', () => {
    // Act
    const subCategoryResult = SubCategoryFactory.create(
      completeCreateSubCategoryDto
    );

    // Assert
    expect(subCategoryResult.isSuccess()).toBeTruthy();
    expect(subCategoryResult.value).toBeInstanceOf(SubCategory);
    if (subCategoryResult.isSuccess()) {
      expect(subCategoryResult.value.name).toEqual(defaultName);
      expect(subCategoryResult.value.code).toEqual(defaultCode);
      expect(subCategoryResult.value.updatedAt).toEqual(defaultUpdatedDate);
      expect(subCategoryResult.value.createdAt).toEqual(defaultCreationDate);
      expect(subCategoryResult.value.id).toEqual(defaultId);
      expect(subCategoryResult.value.deletedAt).toEqual(defaultDeletedDate);
      expect(subCategoryResult.value.deletedAt).toEqual(defaultDeletedDate);
    }
  });

  describe.each([
    ['creation date', 'createdAt'],
    ['update date', 'updatedAt'],
  ])('when creating a subCategory without %s', (_, param) => {
    it(`should set the ${param}`, () => {
      // Arrange
      Object.assign(completeCreateSubCategoryDto, { [param]: null });
      const creationDate = new Date();
      jest.spyOn(DateTools, 'now').mockReturnValue(creationDate);

      // Act
      const subCategoryResult = SubCategoryFactory.create(
        completeCreateSubCategoryDto
      );

      // Assert
      expect(subCategoryResult.isSuccess()).toBeTruthy();
      expect((<SubCategory>subCategoryResult.value)[param]).toEqual(
        creationDate
      );
    });
  });

  describe('when creating a subCategory without deletion date', () => {
    it('should not set a deletion date', () => {
      // Arrange
      Object.assign(completeCreateSubCategoryDto, { deletedAt: null });

      // Act
      const subCategoryResult = SubCategoryFactory.create(
        completeCreateSubCategoryDto
      );

      // Assert
      expect(subCategoryResult.isSuccess()).toBeTruthy();
      expect((<SubCategory>subCategoryResult.value).deletedAt).toBeNull();
    });
  });

  describe('when creating a subCategory without a code', () => {
    it('should generate a valid code', () => {
      // Arrange
      Object.assign(completeCreateSubCategoryDto, { code: null });

      // Act
      const subCategoryResult = SubCategoryFactory.create(
        completeCreateSubCategoryDto
      );

      // Assert
      expect(subCategoryResult.isSuccess()).toBeTruthy();
      expect((<SubCategory>subCategoryResult.value).code).toEqual(
        subCategorySlugify(defaultName)
      );
    });
  });

  describe('when creating a subCategory without an id', () => {
    it('should not generate a new one beforehand', () => {
      // Arrange
      const callingParams = Object.assign(completeCreateSubCategoryDto, {
        id: undefined,
      });
      delete callingParams.id;
      const subCategoryCreateSpy = jest.spyOn(SubCategory, 'create');

      // Act
      SubCategoryFactory.create(completeCreateSubCategoryDto);

      // Assert
      expect(subCategoryCreateSpy).toHaveBeenCalledWith(
        {
          ...callingParams,
          mainCategoryId: mainCategoryId,
        },
        undefined
      );
    });
  });

  describe('when trying to create a subCategory with an invalid id', () => {
    it('should return an InvalidIdException as failure', () => {
      // Arrange
      jest
        .spyOn(UniqueId, 'create')
        .mockReturnValueOnce(fail(new InvalidIdException()));

      // Act
      const categoryResult = SubCategoryFactory.create(
        completeCreateSubCategoryDto
      );

      // Assert
      expect(categoryResult.isFailure()).toBeTruthy();
      expect(categoryResult.value).toBeInstanceOf(InvalidIdException);
    });
  });
});
