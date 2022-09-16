import { DateTools, IdTools } from '@admin-cursos/utils';
import { InvalidParametersException } from '@admin-cursos/exceptions';
import { Course } from '../course.entity';
import { CourseFactory, INVALID_ID_MESSAGE } from '../course.factory';
import { CreateCourseDto } from '../../../dtos/create-course.dto';
import { courseSlugify } from '../../../../utils/course-slugify';

describe('SubCourseFactory unit tests', () => {
  let completeCreateCourseDto: CreateCourseDto;
  const defaultCreationDate = new Date('2022-01-01');
  const defaultUpdatedDate = new Date('2022-01-02');
  const defaultDeletedDate = new Date('2022-01-03');
  const validId = IdTools.generateUuid();
  const defaultName = 'A name';
  const defaultCode = `default_code`;

  beforeEach(() => {
    completeCreateCourseDto = {
      title: defaultName,
      slug: defaultCode,
      updatedAt: defaultUpdatedDate,
      createdAt: defaultCreationDate,
      id: validId,
      deletedAt: defaultDeletedDate,
      categoryId: validId,
      expertsIds: [validId],
    };
  });

  afterEach(jest.resetAllMocks);

  it('should create a course with given params', () => {
    // Act
    const courseResult = CourseFactory.create(completeCreateCourseDto);

    // Assert
    expect(courseResult.isSuccess()).toBeTruthy();
    expect(courseResult.value).toBeInstanceOf(Course);
    if (courseResult.isSuccess()) {
      expect(courseResult.value.title).toEqual(defaultName);
      expect(courseResult.value.updatedAt).toEqual(defaultUpdatedDate);
      expect(courseResult.value.createdAt).toEqual(defaultCreationDate);
      expect(courseResult.value.id).toEqual(validId);
      expect(courseResult.value.isActive).toBeFalsy();
    }
  });

  describe.each([
    ['creation date', 'createdAt'],
    ['update date', 'updatedAt'],
  ])('when creating a course without %s', (_, param) => {
    it(`should set the ${param}`, () => {
      // Arrange
      Object.assign(completeCreateCourseDto, { [param]: null });
      const creationDate = new Date();
      jest.spyOn(DateTools, 'now').mockReturnValue(creationDate);

      // Act
      const courseResult = CourseFactory.create(completeCreateCourseDto);

      // Assert
      expect(courseResult.isSuccess()).toBeTruthy();
      expect((<Course>courseResult.value)[param]).toEqual(creationDate);
    });
  });

  describe('when creating a course without a slug', () => {
    it('should generate a valid code', () => {
      // Arrange
      Object.assign(completeCreateCourseDto, { slug: null });

      // Act
      const courseResult = CourseFactory.create(completeCreateCourseDto);

      // Assert
      expect(courseResult.isSuccess()).toBeTruthy();
      expect((<Course>courseResult.value).slug).toEqual(
        courseSlugify(defaultName)
      );
    });
  });

  describe('when creating a course without an id', () => {
    it('should not generate a new one beforehand', () => {
      // Arrange
      delete completeCreateCourseDto.id;
      const courseCreateSpy = jest.spyOn(Course, 'create');

      // Act
      CourseFactory.create(completeCreateCourseDto);

      // Assert
      expect(courseCreateSpy).toHaveBeenCalledWith(
        expect.anything(),
        undefined
      );
    });
  });

  describe.each([['id'], ['categoryId']])(
    'when trying to create a course with an invalid %s',
    (param) => {
      it('should return an InvalidIdException as failure', () => {
        // Arrange
        const invalidId = 'invalid id';
        Object.assign(completeCreateCourseDto, { [param]: invalidId });

        // Act
        const courseResult = CourseFactory.create(completeCreateCourseDto);

        // Assert
        expect(courseResult.isFailure()).toBeTruthy();
        expect(courseResult.value).toBeInstanceOf(InvalidParametersException);
        expect(
          (courseResult.value as InvalidParametersException).message
        ).toEqual(JSON.stringify({ [param]: INVALID_ID_MESSAGE(invalidId) }));
      });
    }
  );

  describe('when trying to create a course with subcategoryIds', () => {
    let subCategoriesIds: string[];
    const invalidId = 'invalid id';

    beforeEach(() => {
      subCategoriesIds = [validId, validId];
    });

    describe('given any of them is invalid', () => {
      it('should return an InvalidIdException as failure', () => {
        // Arrange
        subCategoriesIds.push('invalid id');
        Object.assign(completeCreateCourseDto, { subCategoriesIds });

        // Act
        const courseResult = CourseFactory.create(completeCreateCourseDto);

        // Assert
        expect(courseResult.isFailure()).toBeTruthy();
        expect(courseResult.value).toBeInstanceOf(InvalidParametersException);
      });

      it('should return an error with all the invalid ids', () => {
        // Arrange
        const anotherInvalidId = 'Another invalid id';
        subCategoriesIds.push(invalidId, anotherInvalidId);
        Object.assign(completeCreateCourseDto, { subCategoriesIds });

        // Act
        const courseResult = CourseFactory.create(completeCreateCourseDto);

        // Assert
        expect(
          (courseResult.value as InvalidParametersException).message
        ).toEqual(
          JSON.stringify({
            subCategoriesIds: [
              INVALID_ID_MESSAGE(invalidId),
              INVALID_ID_MESSAGE(anotherInvalidId),
            ],
          })
        );
      });
    });
  });

  describe('when trying to create a course with expertsIds', () => {
    let expertsIds: string[];
    const invalidId = 'invalid id';

    beforeEach(() => {
      expertsIds = [validId, validId];
    });

    describe('given any of them is invalid', () => {
      it('should return an InvalidIdException as failure', () => {
        // Arrange
        expertsIds.push('invalid id');
        Object.assign(completeCreateCourseDto, { expertsIds });

        // Act
        const courseResult = CourseFactory.create(completeCreateCourseDto);

        // Assert
        expect(courseResult.isFailure()).toBeTruthy();
        expect(courseResult.value).toBeInstanceOf(InvalidParametersException);
      });

      it('should return an error with all the invalid ids', () => {
        // Arrange
        const anotherInvalidId = 'Another invalid id';
        expertsIds.push(invalidId, anotherInvalidId);
        Object.assign(completeCreateCourseDto, {
          expertsIds,
        });

        // Act
        const courseResult = CourseFactory.create(completeCreateCourseDto);

        // Assert
        expect(
          JSON.parse((courseResult.value as InvalidParametersException).message)
        ).toEqual({
          expertsIds: [
            INVALID_ID_MESSAGE(invalidId),
            INVALID_ID_MESSAGE(anotherInvalidId),
          ],
        });
      });
    });
  });

  describe('when trying to create a course with multiple invalid ids', () => {
    it('should return an error with all the invalid ids', () => {
      // Arrange
      const invalidId = 'invalid id';
      Object.assign(completeCreateCourseDto, {
        ['id']: invalidId,
        ['expertsIds']: [invalidId],
        ['subCategoriesIds']: [invalidId],
        ['categoryId']: invalidId,
      });

      // Act
      const courseResult = CourseFactory.create(completeCreateCourseDto);

      // Assert
      expect(
        JSON.parse((courseResult.value as InvalidParametersException).message)
      ).toEqual({
        ['id']: INVALID_ID_MESSAGE(invalidId),
        ['expertsIds']: [INVALID_ID_MESSAGE(invalidId)],
        ['subCategoriesIds']: [INVALID_ID_MESSAGE(invalidId)],
        ['categoryId']: INVALID_ID_MESSAGE(invalidId),
      });
    });
  });
});
