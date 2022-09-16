import { IdTools } from '../id-tools';

describe('IdTools', () => {
  describe('generate', () => {
    it('should generate an id', () => {
      // Act
      const id = IdTools.generateUuid();

      // Assert
      expect(id).toBeDefined();
      expect(typeof id).toEqual('string');
    });

    it('should generate an unique id', () => {
      // Act
      const id = IdTools.generateUuid();
      const anotherId = IdTools.generateUuid();

      // Assert
      expect(id).not.toEqual(anotherId);
    });
  });

  describe('generate', () => {
    describe('when an id is valid', () => {
      it('should return true', () => {
        // Arrange
        const id = IdTools.generateUuid();

        // Act
        const isValid = IdTools.validateUuid(id);

        // Assert
        expect(isValid).toBeTruthy();
      });
    });

    describe('when an id is invalid', () => {
      it('should return false', () => {
        // Arrange
        const id = 'notAnId';

        // Act
        const isValid = IdTools.validateUuid(id);

        // Assert
        expect(isValid).toBeFalsy();
      });
    });
  });
});
