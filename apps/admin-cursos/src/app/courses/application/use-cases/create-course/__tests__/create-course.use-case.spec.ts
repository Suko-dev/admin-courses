import { CreateCourseUseCase } from '../create-course.use-case';
import { CoursesRepository } from '../../../../domain/repositories';
import { CreateCourseInput } from '../create-course.dto';
import {
  fail,
  InternalServerError,
  InvalidIdException,
  succeed,
} from '@admin-cursos/exceptions';
import { Course, CourseFactory } from '../../../../domain/entities';
import { IdTools } from '@admin-cursos/utils';
import SpyInstance = jest.SpyInstance;

describe('CreateCourseUseCase unit test', () => {
  const courseInput: CreateCourseInput = {
    categoryId: IdTools.generateUuid(),
    expertsIds: [IdTools.generateUuid()],
    title: 'A title',
  };

  const course = CourseFactory.create(courseInput).value as Course;
  const createCourseSpy = jest.spyOn(CourseFactory, 'create');
  let createCourseUseCase: CreateCourseUseCase;
  let courseRepositoryMock: CoursesRepository;
  let courseRepositorySaveSpy: SpyInstance;

  beforeAll(() => {
    courseRepositoryMock = {
      save: jest.fn(),
    } as unknown as CoursesRepository;
    courseRepositorySaveSpy = jest.spyOn(courseRepositoryMock, 'save');
  });

  beforeEach(() => {
    createCourseUseCase = new CreateCourseUseCase(courseRepositoryMock);
    courseRepositorySaveSpy.mockResolvedValue(succeed());
    createCourseSpy.mockReturnValue(succeed(course));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when an error occurs while creating a course', () => {
    const error = new InvalidIdException();

    beforeEach(() => {
      createCourseSpy.mockReturnValueOnce(fail(error));
    });

    it('should return a failure result', async () => {
      // Act
      const result = await createCourseUseCase.execute(courseInput);

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });

    it('should return the exception', async () => {
      // Act
      const result = await createCourseUseCase.execute(courseInput);

      // Assert
      expect(result.value).toEqual(error);
    });
  });

  describe('when the course has been successfully created', () => {
    it('should return a success result', async () => {
      // Act
      const result = await createCourseUseCase.execute(courseInput);

      // Assert
      expect(result.isSuccess()).toBeTruthy();
    });

    it('should save the new course', async () => {
      // Act
      await createCourseUseCase.execute(courseInput);

      // Assert
      expect(courseRepositoryMock.save).toHaveBeenCalledWith(course);
    });

    it('should return the created course', async () => {
      // Act
      const result = await createCourseUseCase.execute(courseInput);

      // Assert
      expect(result.value).toEqual({
        id: course.id,
        categoryId: courseInput.categoryId,
        chapters: undefined,
        description: undefined,
        duration: undefined,
        expertsIds: courseInput.expertsIds,
        isFree: false,
        previewUrl: undefined,
        releaseDate: undefined,
        subCategoriesIds: [],
        thumbnail: undefined,
        title: courseInput.title,
      });
    });

    describe('given error occurs while saving the created course', () => {
      const error = new InternalServerError();

      beforeEach(() => {
        courseRepositorySaveSpy.mockReturnValueOnce(fail(error));
      });

      it('should return a failure result', async () => {
        // Act
        const result = await createCourseUseCase.execute(courseInput);

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return the exception', async () => {
        // Act
        const result = await createCourseUseCase.execute(courseInput);

        // Assert
        expect(result.value).toEqual(error);
      });
    });
  });
});
