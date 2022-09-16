import { Course, CourseProps } from '../course.entity';
import { CourseValidatorFactory } from '../../../validators/course-validator.factory';
import { InvalidParametersException } from '@admin-cursos/exceptions';
import { DateTools, IdTools } from '@admin-cursos/utils';
import { UniqueId } from '@admin-cursos/domain';

let courseProps: CourseProps;
const categoryId = createUniqueId();
const expertId = createUniqueId();
const dateMock = new Date();

describe('Course unit tests', () => {
  const courseValidator = CourseValidatorFactory.create();
  const courseValidatorSpy = jest.spyOn(courseValidator, 'validate');
  courseProps = getCourseProps();

  beforeAll(() => {
    jest
      .spyOn(CourseValidatorFactory, 'create')
      .mockReturnValue(courseValidator);
    courseValidatorSpy.mockReturnValue(true);
  });

  describe('create', () => {
    it('should validate itself', () => {
      // Act
      Course.create(courseProps);

      // Assert
      expect(courseValidatorSpy).toHaveBeenCalledWith(courseProps);
    });

    describe('when a parameter is invalid', () => {
      const errors = { name: ['must be a string'] };

      beforeEach(() => {
        courseValidatorSpy.mockReturnValueOnce(false);
        courseValidator['_errors'] = errors;
      });

      it('should return a fail result', () => {
        // Act
        const courseResult = Course.create(courseProps);

        // Assert
        expect(courseResult.isFailure()).toBeTruthy();
      });

      it('should return the validation errors', () => {
        // Arrange

        // Act
        const courseResult = Course.create(courseProps);

        // Assert
        expect(courseResult.value).toBeInstanceOf(InvalidParametersException);
        expect(courseResult.value).toEqual(
          new InvalidParametersException(errors)
        );
      });
    });

    describe('when all parameters are valid', () => {
      it('should return a new course', () => {
        // Act
        const courseResult = Course.create(courseProps);

        // Prepare response
        const createdCourse = courseResult.value as Course;
        // Assert
        expect(courseResult.isSuccess()).toBeTruthy();
        expect(createdCourse).toBeInstanceOf(Course);
        expect(createdCourse.toJson()).toEqual({
          categoryId,
          chapters: [],
          createdAt: dateMock,
          deletedAt: null,
          description: 'An description',
          duration: 1,
          expertsIds: [expertId],
          id: createdCourse.id,
          isFree: true,
          previewUrl: 'An url',
          releaseDate: dateMock,
          slug: 'a_slug',
          subCategoriesIds: [],
          thumbnail: 'An url',
          title: 'A title',
          updatedAt: dateMock,
        });
      });
    });

    describe('when no id is informed', () => {
      it('should create a new valid id', () => {
        // Act
        const courseResult = Course.create(courseProps);

        // Assert
        expect(courseResult.isSuccess()).toBeTruthy();
        if (courseResult.isSuccess()) {
          const id = courseResult.value.id;
          const isValidId = IdTools.validateUuid(id);

          expect(isValidId).toBeTruthy();
        }
      });
    });

    describe('when an id is informed', () => {
      it('should keep the same id', () => {
        // Arrange
        const uniqueId = UniqueId.create().value as UniqueId;

        // Act
        const courseResult = Course.create(courseProps, uniqueId);

        // Assert
        expect(courseResult.isSuccess()).toBeTruthy();
        expect((<Course>courseResult.value).id).toEqual(uniqueId.value);
      });
    });
  });

  describe('publish', () => {
    let course: Course;

    beforeEach(() => {
      course = createCourse();
    });

    describe('given the course has no errors', () => {
      it('should return a success result', () => {
        // Act
        const result = course.publish(new Date());

        // Assert
        expect(result.isSuccess()).toBeTruthy();
      });

      it('should set the release date', () => {
        // Arrange
        const releaseDate = DateTools.now();

        // Act
        course.publish(releaseDate);

        // Assert
        expect(course.releaseDate).toEqual(releaseDate);
      });
    });

    describe('given the course has problems and cannot be published', () => {
      beforeEach(() => {
        courseValidatorSpy.mockReturnValueOnce(false);
        courseValidator['_errors'] = { title: ['invalid title'] };
      });

      it('should return a fail result', () => {
        // Act
        const result = course.publish(new Date());

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return an InvalidParametersException', () => {
        // Act
        const result = course.publish(new Date());

        // Assert
        expect(result.value).toBeInstanceOf(InvalidParametersException);
      });

      it('should not set the release date', () => {
        // Act
        course.publish(new Date());

        // Assert
        expect(course.releaseDate).toBeUndefined();
      });
    });
  });
});
// factories
function createCourse(props: Partial<CourseProps> = {}): Course {
  const courseResult = Course.create({ ...courseProps, ...props });
  return courseResult.value as Course;
}

function createUniqueId(): UniqueId {
  return UniqueId.create().value as UniqueId;
}

function getCourseProps(): CourseProps {
  return {
    categoryId,
    title: 'A title',
    expertsIds: [expertId],
    description: 'An description',
    duration: 1,
    isFree: true,
    subCategoriesIds: [],
    previewUrl: 'An url',
    releaseDate: dateMock,
    thumbnail: 'An url',
    createdAt: dateMock,
    updatedAt: dateMock,
    deletedAt: null,
    slug: 'a_slug',
    chapters: [],
  };
}
