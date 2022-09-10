import { ObjectTools } from '../object-tools';

describe('ObjectTools', () => {
  describe.each([
    ['string', 'string'],
    ['boolean', true],
    ['number', 5],
    ['object', { object: 'string' }],
  ])('when freezing a %s', (type, object) => {
    it('should freeze the item', () => {
      // Act
      const frozenObject = ObjectTools.deepFreeze(object);

      // Assert
      expect(Object.isFrozen(frozenObject)).toBeTruthy();
    });

    it('should not alter the object', () => {
      // Act
      const frozenObject = ObjectTools.deepFreeze(object);

      // Assert
      expect(frozenObject).toEqual(object);
    });
  });

  describe('when freezing a object', () => {
    it('should freeze the nested objects', () => {
      // Arranje
      const object = { nestedObject: { object: 'string' } };

      // Act
      const frozenObject = ObjectTools.deepFreeze(object);

      // Assert
      expect(Object.isFrozen(frozenObject.nestedObject)).toBeTruthy();
    });
  });
});
