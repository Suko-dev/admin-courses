import { Entity } from '../entity';
import { UniqueId } from '../unique-id.vo';
import { EntityValidator } from '../validators';
import { IdTools } from '@admin-cursos/utils';

interface StubProps {
  mock: string;
}

class StubEntity extends Entity<StubProps> {
  constructor(id?: UniqueId) {
    super(id);
    this.props = { mock: 'string' };
  }

  static create(id?: UniqueId) {
    return new StubEntity(id);
  }

  protected getPropsValidator(): EntityValidator {
    return new (class extends EntityValidator {
      validate(): boolean {
        return false;
      }
    })();
  }
}

describe('Entity unit test', () => {
  describe('when no id is informed', () => {
    it('should create an entity with a random unique id', () => {
      // Act
      const entity = StubEntity.create();

      // Arrange
      expect(entity.id).toBeDefined();
      expect(IdTools.validateUuid(entity.id)).toBeTruthy();
    });
  });

  describe('when a id is informed', () => {
    it('should create an entity with given id', () => {
      // Arrange
      const uniqueId = UniqueId.create();
      if (uniqueId.isFailure()) {
        // safeguard para caso de erro na geração do uniqueId
        return expect(false).toBeTruthy();
      }

      // Act
      const entity = StubEntity.create(uniqueId.value);

      // Assert
      expect(entity.id).toBeDefined();
      expect(IdTools.validateUuid(entity.id)).toBeTruthy();
    });
  });

  describe('toJson', () => {
    it('should return the id plus its props', () => {
      // Act
      const entity = StubEntity.create();

      // Prepare response
      const json = entity.toJson();

      // Assert
      expect(json).toHaveProperty('id');
      expect(json).toHaveProperty('mock');
      expect(json.mock).toEqual('string');
    });
  });
});
