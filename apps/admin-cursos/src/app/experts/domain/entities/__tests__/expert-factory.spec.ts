import { CreateExpertDto } from '../../dtos/create-expert.dto';
import { DateTools, IdTools } from '@admin-cursos/utils';
import { Expert, ExpertFactory } from '../expert';
import { InvalidIdException } from '@admin-cursos/exceptions';

describe('SubExpertFactory unit tests', () => {
  let completeCreateExpertDto: CreateExpertDto;
  const defaultCreationDate = new Date('2022-01-01');
  const defaultUpdatedDate = new Date('2022-01-02');
  const defaultDeletedDate = new Date('2022-01-03');
  const defaultId = IdTools.generateUuid();
  const defaultName = 'A name';
  const defaultAbout = 'default_code';
  const defaultAvatar = 'avatar';

  beforeEach(() => {
    completeCreateExpertDto = {
      about: defaultAbout,
      avatar: defaultAvatar,
      name: defaultName,
      updatedAt: defaultUpdatedDate,
      createdAt: defaultCreationDate,
      id: defaultId,
      deletedAt: defaultDeletedDate,
    };
  });

  afterEach(jest.resetAllMocks);

  it('should create a expert with given params', () => {
    // Act
    const expertResult = ExpertFactory.create(completeCreateExpertDto);

    // Assert
    expect(expertResult.isSuccess()).toBeTruthy();
    expect(expertResult.value).toBeInstanceOf(Expert);
    if (expertResult.isSuccess()) {
      expect(expertResult.value.name).toEqual(defaultName);
      expect(expertResult.value.about).toEqual(defaultAbout);
      expect(expertResult.value.updatedAt).toEqual(defaultUpdatedDate);
      expect(expertResult.value.createdAt).toEqual(defaultCreationDate);
      expect(expertResult.value.id).toEqual(defaultId);
      expect(expertResult.value.avatar).toEqual(defaultAvatar);
    }
  });

  describe.each([
    ['creation date', 'createdAt'],
    ['update date', 'updatedAt'],
  ])('when creating a expert without %s', (_, param) => {
    it(`should set the ${param}`, () => {
      // Arrange
      Object.assign(completeCreateExpertDto, { [param]: null });
      const creationDate = new Date();
      jest.spyOn(DateTools, 'now').mockReturnValue(creationDate);

      // Act
      const expertResult = ExpertFactory.create(completeCreateExpertDto);

      // Assert
      expect(expertResult.isSuccess()).toBeTruthy();
      expect((<Expert>expertResult.value)[param]).toEqual(creationDate);
    });
  });

  describe('when creating a expert without deletion date', () => {
    it('should not set a deletion date', () => {
      // Arrange
      Object.assign(completeCreateExpertDto, { deletedAt: null });

      // Act
      const expertResult = ExpertFactory.create(completeCreateExpertDto);

      // Assert
      expect(expertResult.isSuccess()).toBeTruthy();
      expect((<Expert>expertResult.value)['props'].deletedAt).toBeNull();
    });
  });

  describe('when creating a expert without a avatar', () => {
    it('not set a default one', () => {
      // Arrange
      Object.assign(completeCreateExpertDto, { avatar: null });

      // Act
      const expertResult = ExpertFactory.create(completeCreateExpertDto);

      // Assert
      expect(expertResult.isSuccess()).toBeTruthy();
      expect((<Expert>expertResult.value).avatar).toBeNull();
    });
  });

  describe('when creating a expert without an id', () => {
    it('should not generate a new one beforehand', () => {
      // Arrange
      Object.assign(completeCreateExpertDto, { id: undefined });
      const expertCreateSpy = jest.spyOn(Expert, 'create');

      // Act
      ExpertFactory.create(completeCreateExpertDto);

      // Assert
      expect(expertCreateSpy).toHaveBeenCalledWith(
        completeCreateExpertDto,
        undefined
      );
    });
  });

  describe('when trying to create a expert with an invalid id', () => {
    it('should return an InvalidIdException as failure', () => {
      // Arrange
      Object.assign(completeCreateExpertDto, { id: 'invalid id' });

      // Act
      const expertResult = ExpertFactory.create(completeCreateExpertDto);

      // Assert
      expect(expertResult.isFailure()).toBeTruthy();
      expect(expertResult.value).toBeInstanceOf(InvalidIdException);
    });
  });
});
