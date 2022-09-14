import { ExpertsRepository } from '../../../../domain/repositories';
import { UpdateExpertUseCase } from '../update-expert.use-case';
import {
  EntityNotFoundException,
  fail,
  InternalServerError,
  InvalidParametersException,
  succeed,
} from '@admin-cursos/exceptions';
import { UpdateExpertInput } from '../update-expert.dto';
import { Expert, ExpertFactory } from '../../../../domain/entities';
import { IdTools } from '@admin-cursos/utils';
import SpyInstance = jest.SpyInstance;

let expertRepositorySaveSpy: SpyInstance;
let expertRepositoryFindSpy: SpyInstance;
let expertRepositoryMock: ExpertsRepository;
let expert: Expert;

const id = IdTools.generate();
const initialName = 'A name';
const initialAbout = 'An about';
const initialAvatar = 'A avatar';

describe('UpdateExpertUseCase unit test', () => {
  const updateExpertInput: UpdateExpertInput = {
    id: 'An id',
    name: 'Another name',
    about: 'Another about',
    avatar: 'Another avatar',
  };
  let updateExpertUseCase: UpdateExpertUseCase;

  beforeAll(() => {
    expertRepositoryMock = {
      save: jest.fn(),
      findByIdOrFail: jest.fn(),
    } as unknown as ExpertsRepository;
  });

  beforeEach(() => {
    updateExpertUseCase = new UpdateExpertUseCase(expertRepositoryMock);
    expert = buildExpert();
    setupSpies();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when an error occurs while finding a expert', () => {
    const error = new EntityNotFoundException(updateExpertInput.id);

    beforeEach(() => {
      expertRepositoryFindSpy.mockReturnValueOnce(fail(error));
    });

    it('should return a failure result', async () => {
      // Act
      const result = await updateExpertUseCase.execute(updateExpertInput);

      // Assert
      expect(result.isFailure()).toBeTruthy();
    });

    it('should return the exception', async () => {
      // Act
      const result = await updateExpertUseCase.execute(updateExpertInput);

      // Assert
      expect(result.value).toEqual(error);
    });
  });

  describe('when a expert has been found', () => {
    describe('given the name has to be updated', () => {
      const nameToUpdate = 'Another name';
      const updateExpertInput = { id: 'An id', name: nameToUpdate };

      it('should change the expert name', async () => {
        // Act
        const result = await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(result.isSuccess()).toBeTruthy();
        expect((<Expert>result.value).name).toEqual(nameToUpdate);
      });
    });

    describe('given the about has to be updated', () => {
      const aboutToUpdate = 'Another about';
      const updateExpertInput = { id: 'An id', about: aboutToUpdate };

      it('should change the expert about', async () => {
        // Act
        const result = await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(result.isSuccess()).toBeTruthy();
        expect((<Expert>result.value).about).toEqual(aboutToUpdate);
      });
    });

    describe('given the avatar has to be updated', () => {
      const avatarToUpdate = 'Another avatar';
      const updateExpertInput = { id: 'An id', avatar: avatarToUpdate };

      it('should change the expert avatar', async () => {
        // Act
        const result = await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(result.isSuccess()).toBeTruthy();
        expect((<Expert>result.value).avatar).toEqual(avatarToUpdate);
      });
    });

    describe('given an error occurs while updating a expert', () => {
      const error = new InvalidParametersException({
        name: ['must be not empty'],
      });
      const updateExpertInput = { id: 'An id', about: 'An about' };

      beforeEach(() => {
        jest.spyOn(expert, 'update').mockReturnValueOnce(fail(error));
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('should return a failure result', async () => {
        // Act
        const result = await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return the exception', async () => {
        // Act
        const result = await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(result.value).toEqual(error);
      });
    });

    describe('given the expert has been successfully updated', () => {
      it('should return a success result', async () => {
        // Act
        const result = await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(result.isSuccess()).toBeTruthy();
      });

      it('should save the updated expert', async () => {
        // Act
        await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(expertRepositoryMock.save).toHaveBeenCalledWith(expert);
      });

      it('should return the updated expert', async () => {
        // Act
        const result = await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(result.value).toEqual({
          id: expert.id,
          name: updateExpertInput.name,
          about: updateExpertInput.about,
          avatar: updateExpertInput.avatar,
          createdAt: expert.createdAt,
        });
      });
    });

    describe('given no parameters to update have been passed', () => {
      const updateExpertInput = { id };

      it('should return a success result', async () => {
        // Act
        const result = await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(result.isSuccess()).toBeTruthy();
      });

      it('should not save the expert', async () => {
        // Act
        await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(expertRepositoryMock.save).not.toHaveBeenCalled();
      });

      it('should return the non updated expert', async () => {
        // Act
        const result = await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(result.value).toEqual({
          id: updateExpertInput.id,
          name: initialName,
          about: initialAbout,
          avatar: initialAvatar,
          createdAt: expert.createdAt,
        });
      });
    });

    describe('given an error occurs while saving the updated expert', () => {
      const error = new InternalServerError();

      beforeEach(() => {
        expertRepositorySaveSpy.mockReturnValueOnce(fail(error));
      });

      it('should return a failure result', async () => {
        // Act
        const result = await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(result.isFailure()).toBeTruthy();
      });

      it('should return the exception', async () => {
        // Act
        const result = await updateExpertUseCase.execute(updateExpertInput);

        // Assert
        expect(result.value).toEqual(error);
      });
    });
  });
});
// factories
function setupSpies() {
  expertRepositoryFindSpy = jest.spyOn(expertRepositoryMock, 'findByIdOrFail');
  expertRepositorySaveSpy = jest.spyOn(expertRepositoryMock, 'save');

  expertRepositoryFindSpy.mockResolvedValue(succeed(expert));
  expertRepositorySaveSpy.mockResolvedValue(succeed());
}

function buildExpert(): Expert {
  return ExpertFactory.create({
    id,
    name: initialName,
    avatar: initialAvatar,
    about: initialAbout,
  }).value as Expert;
}
