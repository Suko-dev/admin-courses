import { Validate, validateSync } from 'class-validator';
import { IsUniqueId } from '../';
import { UniqueId } from '../../unique-id.vo';
import { IdTools } from '@admin-cursos/utils';

class StubClass {
  @Validate(IsUniqueId)
  itemToValidate;
}

describe('UniqueIdValidator Unit test', () => {
  const uniqueId = UniqueId.create().value as UniqueId;
  const uuid = IdTools.generateUuid();

  describe.each([
    ['an uniqueId', 'no error', uniqueId, 0],
    ['a string', 'one error', 'uniqueId', 1],
    ['an uniqueId string', 'one error', uuid, 1],
    ['a number', 'one error', 123456, 1],
    ['an array of unique ids', 'one error', [uniqueId], 1],
    ['an object containing an uniqueId', 'one error', { uniqueId }, 1],
    ['null', 'one error', null, 1],
    ['undefined', 'one error', undefined, 1],
  ])(
    'when item to be validated is %s',
    (_, responseDescription, itemToValidate, expectedErrors: number) => {
      it(`should return ${responseDescription}`, () => {
        // Arrange
        const classToValidate = new StubClass();
        classToValidate.itemToValidate = itemToValidate;

        // Act
        const errors = validateSync(classToValidate);

        // Assert
        expect(errors.length).toEqual(expectedErrors);
      });
    }
  );
});
