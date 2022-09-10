import { UniqueId } from '../unique-id.vo';
import { IdTools } from '@admin-cursos/utils';
import { InvalidIdException } from '@admin-cursos/exceptions';

describe('UniqueId unit test', () => {
  describe('create', () => {
    describe('given no string is informed on constructor', () => {
      it('should create a new UniqueId', () => {
        // Act
        const result = UniqueId.create();

        // Asset
        expect(result.isSuccess()).toBeTruthy();
        expect(result.value).toBeInstanceOf(UniqueId);
      });
    });

    describe('given a valid id string is informed on constructor', () => {
      it('should create a new UniqueId', () => {
        // Arrange
        const uuid = IdTools.generate();

        // Act
        const result = UniqueId.create(uuid);

        // Asset
        expect(result.isSuccess()).toBeTruthy();
        expect(result.value).toBeInstanceOf(UniqueId);
        expect((<UniqueId>result.value).value).toEqual(uuid);
      });
    });

    describe('given an invalid id string is informed on constructor', () => {
      it('should create a new UniqueId', () => {
        // Arrange
        const invalidIdString = 'invalidIdString';

        // Act
        const result = UniqueId.create(invalidIdString);

        // Asset
        expect(result.isFailure()).toBeTruthy();
        expect(result.value).toBeInstanceOf(InvalidIdException);
      });
    });
  });
});
