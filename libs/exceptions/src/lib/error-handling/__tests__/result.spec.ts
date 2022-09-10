import { succeed } from '../success';
import { fail } from '../failure';

describe('Result unit test', () => {
  describe('given a result is success', () => {
    const result = succeed('success');

    it('should return true for isSuccess', () => {
      // Assert
      expect(result.isSuccess()).toBeTruthy();
    });

    it('should return false for isFailure', () => {
      // Assert
      expect(result.isFailure()).toBeFalsy();
    });
  });

  describe('given a result is failure', () => {
    const result = fail('success');

    it('should return false for isSuccess', () => {
      // Assert
      expect(result.isSuccess()).toBeFalsy();
    });

    it('should return true for isFailure', () => {
      // Assert
      expect(result.isFailure()).toBeTruthy();
    });
  });
});
