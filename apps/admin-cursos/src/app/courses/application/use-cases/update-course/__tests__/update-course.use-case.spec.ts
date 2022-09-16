import { CoursesRepository } from '../../../../domain/repositories';
import { UpdateCourseUseCase } from '../update-course.use-case';
import {
  EntityNotFoundException,
  fail,
  InternalServerError,
  InvalidParametersException,
  succeed,
} from '@admin-cursos/exceptions';
import { UpdateCourseInput } from '../update-course.dto';
import { Course, CourseFactory } from '../../../../domain/entities';
import { IdTools } from '@admin-cursos/utils';
import { courseSlugify } from '../../../../utils/course-slugify';
import SpyInstance = jest.SpyInstance;

let courseRepositorySaveSpy: SpyInstance;
let courseRepositoryFindSpy: SpyInstance;
let courseRepositoryMock: CoursesRepository;
let course: Course;

const id = IdTools.generateUuid();
const title = 'A title';
const validId = IdTools.generateUuid();

describe('UpdateCourseUseCase unit test', () => {
  const updateCourseInput: UpdateCourseInput = {
    id: 'An id',
  };

  let updateCourseUseCase: UpdateCourseUseCase;

  beforeAll(() => {
    courseRepositoryMock = {
      save: jest.fn(),
      findByIdOrFail: jest.fn(),
    } as unknown as CoursesRepository;
  });

  beforeEach(() => {
    updateCourseUseCase = new UpdateCourseUseCase(courseRepositoryMock);
    course = buildCourse();
    setupSpies();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when an error occurs while finding a course', () => {
    const error = new EntityNotFoundException(updateCourseInput.id);

    beforeEach(() => {
      courseRepositoryFindSpy.mockReturnValueOnce(fail(error));
    });

    it('should return a failure result', async () => {
      // Act
      const result = await updateCourseUseCase.execute(updateCourseInput);

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });

    it('should return the exception', async () => {
      // Act
      const result = await updateCourseUseCase.execute(updateCourseInput);

      // Assert
      expect(result.value).toEqual(error);
    });
  });

  describe('when a course has been found', () => {
    describe('given there is no prop to be updated', () => {
      it('should not update the course', async () => {
        // Arrange
        jest.spyOn(course, 'update');

        // Act
        await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(course.update).not.toHaveBeenCalled();
      });

      it('should not save course', async () => {
        // Act
        await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(courseRepositoryMock.save).not.toHaveBeenCalled();
      });

      it('should return a success result', async () => {
        // Act
        const result = await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(result.isSuccess()).toBeTruthy();
      });

      it('should return the course', async () => {
        // Act
        const result = await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(result.value).toEqual({
          id: course.id,
          categoryId: course.categoryId,
          duration: course.duration,
          releaseDate: course.releaseDate,
          isFree: course.isFree,
          thumbnail: course.thumbnail,
          previewUrl: course.previewUrl,
          description: course.description,
          expertsIds: course.expertsIds,
          subCategoriesIds: course.subCategoriesIds,
          title: course.title,
          slug: course.slug,
        });
      });
    });

    describe('given  an error occurs while parsing it to uniqueId', () => {
      const updateCourseInput = { id: 'An id', categoryId: 'invalid id' };

      it('should return a fail result', async () => {
        // Act
        const result = await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return an InvalidParametersException', async () => {
        // Act
        const result = await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(result.value).toBeInstanceOf(InvalidParametersException);
      });
    });

    describe('given an error occurs while updating a course', () => {
      const error = new InvalidParametersException({
        name: ['must be not empty'],
      });
      const updateCourseInput = { id: 'An id', about: 'An about' };

      beforeEach(() => {
        jest.spyOn(course, 'update').mockReturnValueOnce(fail(error));
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('should return a failure result', async () => {
        // Act
        const result = await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return the exception', async () => {
        // Act
        const result = await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(result.value).toEqual(error);
      });
    });

    describe('given the course has been successfully updated', () => {
      const titleToUpdate = 'Another title';
      const updateCourseInput: UpdateCourseInput = {
        id: 'An id',
        title: titleToUpdate,
      };

      it('should return a success result', async () => {
        // Act
        const result = await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(result.isSuccess()).toBeTruthy();
      });

      it('should save the updated course', async () => {
        // Act
        await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(courseRepositoryMock.save).toHaveBeenCalledWith(course);
      });

      it('should return the updated course', async () => {
        // Act
        const result = await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(result.value).toEqual({
          id: course.id,
          title: titleToUpdate,
          isFree: false,
          previewUrl: undefined,
          releaseDate: undefined,
          slug: courseSlugify(title),
          subCategoriesIds: [],
          thumbnail: undefined,
          categoryId: validId,
          description: undefined,
          duration: undefined,
          expertsIds: [validId],
        });
      });
    });

    describe('given an error occurs while saving the updated course', () => {
      const error = new InternalServerError();
      const updateCourseInput: UpdateCourseInput = {
        id: 'An id',
        title: 'titleToUpdate',
      };

      beforeEach(() => {
        courseRepositorySaveSpy.mockReturnValueOnce(fail(error));
      });

      it('should return a failure result', async () => {
        // Act
        const result = await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return the exception', async () => {
        // Act
        const result = await updateCourseUseCase.execute(updateCourseInput);

        // Assert
        expect(result.value).toEqual(error);
      });
    });
  });
});
// factories
function setupSpies() {
  courseRepositoryFindSpy = jest.spyOn(courseRepositoryMock, 'findByIdOrFail');
  courseRepositorySaveSpy = jest.spyOn(courseRepositoryMock, 'save');

  courseRepositoryFindSpy.mockResolvedValue(succeed(course));
  courseRepositorySaveSpy.mockResolvedValue(succeed());
}

function buildCourse(): Course {
  return CourseFactory.create({
    id,
    categoryId: validId,
    expertsIds: [validId],
    title,
  }).value as Course;
}
