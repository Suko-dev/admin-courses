import { CourseValidator } from '../course-validator';
import { CourseProps } from '../../entities';
import { UniqueId } from '@admin-cursos/domain';

describe('CourseValidator unit test', () => {
  let courseValidator: CourseValidator;
  let validProps: CourseProps;
  const id = UniqueId.create().value as UniqueId;

  beforeEach(() => {
    courseValidator = new CourseValidator();
    validProps = {
      title: 'A title',
      slug: 'a_code',
      subCategoriesIds: [id, id],
      description: 'A description',
      duration: 1,
      isFree: true,
      previewUrl: 'An url',
      releaseDate: new Date(),
      categoryId: id,
      expertsIds: [id],
      thumbnail: 'A thumbnail',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
  });

  it('should be defined', () => {
    // Assert
    expect(courseValidator).toBeDefined();
  });

  describe('given a valid props is informed', () => {
    it('should return true', () => {
      // Act
      const isValid = courseValidator.validate(validProps);

      // Assert
      expect(isValid).toBeTruthy();
    });

    it('should has no errors', () => {
      // Act
      courseValidator.validate(validProps);

      // Assert
      expect(courseValidator.errors).not.toBeDefined();
    });
  });

  describe('given an invalid props', () => {
    describe.each([
      ['title', 'an empty string', '', { title: '' }],
      ['title', 'not a string', '', { title: 1 }],
      ['title', 'undefined', '', { title: undefined }],
      ['description', 'an empty string', '', { description: '' }],
      ['description', 'not a string', '', { description: 1 }],
      ['duration', 'a string', '', { duration: '1' }],
      ['duration', 'zero', '', { duration: 0 }],
      ['duration', 'a negative number', '', { duration: -3 }],
      ['slug', 'an empty string', '', { slug: '' }],
      ['slug', 'not a string', '', { slug: 1 }],
      ['slug', 'undefined', '', { slug: undefined }],
      ['isFree', 'a string', '', { isFree: 'true' }],
      ['isFree', 'number one', '', { isFree: 1 }],
      ['isFree', 'number zero', '', { isFree: 0 }],
      ['isFree', 'undefined', '', { isFree: undefined }],
      ['thumbnail', 'an empty string', '', { thumbnail: '' }],
      ['thumbnail', 'not a string', '', { thumbnail: 1 }],
      ['categoryId', 'undefined', '', { categoryId: undefined }],
      ['categoryId', 'null', '', { categoryId: null }],
      ['categoryId', 'not an uuid', '', { categoryId: 'fake-uuid' }],
      ['expertsIds', 'undefined', '', { expertsIds: undefined }],
      ['expertsIds', 'null', '', { expertsIds: null }],
      ['expertsIds', 'not an uuid', '', { expertsIds: 'fake-uuid' }],
      ['expertsIds', 'not an array', '', { expertsIds: id }],
      ['subCategoriesIds', 'undefined', '', { subCategoriesIds: undefined }],
      ['subCategoriesIds', 'null', '', { subCategoriesIds: null }],
      ['subCategoriesIds', 'not an uuid', '', { subCategoriesIds: 'uuid' }],
      ['subCategoriesIds', 'not an array', '', { subCategoriesIds: id }],
      ['createdAt', 'undefined', '', { createdAt: undefined }],
      ['createdAt', 'not a date', '', { createdAt: '10/10/2000' }],
      ['releaseDate', 'not a date', '', { releaseDate: '10/10/2000' }],
      ['updatedAt', 'undefined', '', { updatedAt: undefined }],
      ['updatedAt', 'not a date', '', { updatedAt: '10/10/2000' }],
      ['deletedAt', 'not a date', '', { deletedAt: '10/10/2000' }],
      [
        'course',
        'has a release date but ',
        'thumbnail is not defined',
        { thumbnail: undefined },
      ],
      [
        'course',
        'has a release date but ',
        'previewUrl is not defined',
        { previewUrl: undefined },
      ],
      [
        'course',
        'has a release date but ',
        'duration is not defined',
        { duration: undefined },
      ],
      [
        'course',
        'has a release date but ',
        'description is not defined',
        { description: undefined },
      ],
    ])('when %s is %s%s', (_, __, ___, invalidProp) => {
      it('should return false', () => {
        // Arrange
        const invalidProps = Object.assign(validProps, invalidProp);

        // Act
        const isValid = courseValidator.validate(invalidProps);

        // Assert
        expect(isValid).toBeFalsy();
      });
    });
  });
});
