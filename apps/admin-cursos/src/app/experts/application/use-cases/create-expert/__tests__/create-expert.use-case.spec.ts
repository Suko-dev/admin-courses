import { CreateExpertUseCase } from '../create-expert.use-case';
import { ExpertsRepository } from '../../../../domain/repositories';
import { CreateExpertInput } from '../create-expert.dto';
import {
  fail,
  InternalServerError,
  InvalidIdException,
  succeed,
} from '@admin-cursos/exceptions';
import { Expert, ExpertFactory } from '../../../../domain/entities';
import SpyInstance = jest.SpyInstance;

describe('CreateCourseUseCase unit test', () => {
  const expertInput: CreateExpertInput = {
    name: 'A name',
    about: 'Lorem ipsum',
    avatar: 'avatar',
  };
  const expert = ExpertFactory.create(expertInput).value as Expert;
  const createExpertSpy = jest.spyOn(ExpertFactory, 'create');
  let createExpertUseCase: CreateExpertUseCase;
  let expertRepositoryMock: ExpertsRepository;
  let expertRepositorySaveSpy: SpyInstance;

  beforeAll(() => {
    expertRepositoryMock = {
      save: jest.fn(),
    } as unknown as ExpertsRepository;
    expertRepositorySaveSpy = jest.spyOn(expertRepositoryMock, 'save');
  });

  beforeEach(() => {
    createExpertUseCase = new CreateExpertUseCase(expertRepositoryMock);
    expertRepositorySaveSpy.mockResolvedValue(succeed());
    createExpertSpy.mockReturnValue(succeed(expert));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when an error occurs while creating a expert', () => {
    const error = new InvalidIdException();

    beforeEach(() => {
      createExpertSpy.mockReturnValueOnce(fail(error));
    });

    it('should return a failure result', async () => {
      // Act
      const result = await createExpertUseCase.execute(expertInput);

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });

    it('should return the exception', async () => {
      // Act
      const result = await createExpertUseCase.execute(expertInput);

      // Assert
      expect(result.value).toEqual(error);
    });
  });

  describe('when the expert has been successfully created', () => {
    it('should return a success result', async () => {
      // Act
      const result = await createExpertUseCase.execute(expertInput);

      // Assert
      expect(result.isSuccess()).toBeTruthy();
    });

    it('should save the new expert', async () => {
      // Act
      await createExpertUseCase.execute(expertInput);

      // Assert
      expect(expertRepositoryMock.save).toHaveBeenCalledWith(expert);
    });

    it('should return the created expert', async () => {
      // Act
      const result = await createExpertUseCase.execute(expertInput);

      // Assert
      expect(result.value).toEqual({
        name: expert.name,
        id: expert.id,
        about: expert.about,
        avatar: expert.avatar,
        createdAt: expert.createdAt,
      });
    });

    describe('given error occurs while saving the created expert', () => {
      const error = new InternalServerError();

      beforeEach(() => {
        expertRepositorySaveSpy.mockReturnValueOnce(fail(error));
      });

      it('should return a failure result', async () => {
        // Act
        const result = await createExpertUseCase.execute(expertInput);

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return the exception', async () => {
        // Act
        const result = await createExpertUseCase.execute(expertInput);

        // Assert
        expect(result.value).toEqual(error);
      });
    });
  });
});
